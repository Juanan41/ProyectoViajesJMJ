import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { BookingRecord, getStoredBookings, syncBookingStoreFromRemote } from '../../data/destinations';
import { fetchRemoteStore, putRemoteStore } from '../../data/persistence-api';

const AUTH_ACCOUNTS_STORAGE_KEY = 'jmj_auth_accounts_v1';
const AUTH_ACCOUNTS_API_PATH = '/auth/accounts';
const HOTEL_BOOKING_STORAGE_KEY = 'jmj-bookings';
const HOTEL_BOOKING_API_PATH = '/bookings';

type DashboardPeriod = 'month' | 'quarter' | 'semester' | 'year';
type DashboardTab = 'overview' | 'users';

interface PersistedAccountState {
    user: {
        id: string;
        name: string;
        email: string;
        role?: 'admin' | 'user';
        avatarUrl?: string;
        balance?: number;
    };
    credits: number;
    cards: Array<{ id: string; last4: string; holder: string; expiry: string }>;
}

type PersistedAuthStore = Record<string, PersistedAccountState>;

interface UserAdminRow {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    balance: number;
    bookings: number;
    activeBookings: number;
    canceledBookings: number;
    totalSpent: number;
}

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './admin-dashboard.html',
    styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
    constructor(
        private authService: Auth,
        private router: Router,
    ) { }

    readonly selectedPeriod = signal<DashboardPeriod>('month');
    readonly selectedTab = signal<DashboardTab>('overview');
    readonly selectedUserEmail = signal<string | null>(null);
    readonly isRefreshing = signal(false);
    readonly lastRefreshAt = signal<Date | null>(null);
    readonly editingUserEmail = signal<string | null>(null);

    editUserName = '';
    editUserBalance = 0;

    private readonly allBookings = signal<BookingRecord[]>([]);
    private readonly allUsers = signal<UserAdminRow[]>([]);

    readonly totalStoredBookings = computed(() => this.allBookings().length);
    readonly totalStoredUsers = computed(() => this.allUsers().length);

    readonly currentBookings = computed(() => {
        const range = this.getCurrentRange(this.selectedPeriod());
        return this.filterBookingsByRange(this.allBookings(), range.start, range.end);
    });

    readonly previousBookings = computed(() => {
        const period = this.selectedPeriod();
        const currentRange = this.getCurrentRange(period);
        const previousRange = this.getPreviousRange(currentRange.start, currentRange.end);
        return this.filterBookingsByRange(this.allBookings(), previousRange.start, previousRange.end);
    });

    readonly totalBookings = computed(() => this.currentBookings().length);

    readonly totalRevenue = computed(() =>
        this.currentBookings()
            .filter((booking) => (booking.status ?? 'active') !== 'canceled')
            .reduce((sum, booking) => sum + booking.totalAmount, 0),
    );

    readonly topDestination = computed(() => {
        const counts = new Map<string, number>();

        this.currentBookings().forEach((booking) => {
            if ((booking.status ?? 'active') === 'canceled') return;
            const key = booking.destination;
            counts.set(key, (counts.get(key) ?? 0) + 1);
        });

        const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
        if (sorted.length === 0) {
            return { name: 'Sin datos', count: 0 };
        }

        return { name: sorted[0][0], count: sorted[0][1] };
    });

    readonly bookingsDelta = computed(() => {
        const current = this.currentBookings().length;
        const previous = this.previousBookings().length;
        return this.getPercentageChange(previous, current);
    });

    readonly revenueDelta = computed(() => {
        const current = this.currentBookings()
            .filter((booking) => (booking.status ?? 'active') !== 'canceled')
            .reduce((sum, booking) => sum + booking.totalAmount, 0);

        const previous = this.previousBookings()
            .filter((booking) => (booking.status ?? 'active') !== 'canceled')
            .reduce((sum, booking) => sum + booking.totalAmount, 0);

        return this.getPercentageChange(previous, current);
    });

    readonly visibleUsers = computed(() =>
        [...this.allUsers()].sort((a, b) => b.totalSpent - a.totalSpent || b.bookings - a.bookings),
    );

    readonly selectedUser = computed(() => {
        const email = this.selectedUserEmail();
        if (!email) return null;
        return this.visibleUsers().find((user) => user.email === email) ?? null;
    });

    readonly selectedUserBookings = computed(() => {
        const email = this.selectedUserEmail();
        if (!email) return [];

        return this.allBookings()
            .filter((booking) => (booking.userEmail ?? '').trim().toLowerCase() === email)
            .sort((left, right) => right.bookingDate.localeCompare(left.bookingDate));
    });

    async ngOnInit(): Promise<void> {
        if (!this.authService.isCurrentUserAdmin()) {
            this.router.navigate(['/']);
            return;
        }

        if (this.router.url.startsWith('/admin/users')) {
            this.selectedTab.set('users');
        }

        await this.loadDashboardData();
        this.lastRefreshAt.set(new Date());
    }

    setPeriod(period: DashboardPeriod) {
        this.selectedPeriod.set(period);
    }

    setTab(tab: DashboardTab) {
        this.selectedTab.set(tab);

        if (tab !== 'users') {
            this.selectedUserEmail.set(null);
        }
    }

    async refreshData(): Promise<void> {
        if (this.isRefreshing()) return;

        this.isRefreshing.set(true);
        try {
            await this.loadDashboardData();
            this.lastRefreshAt.set(new Date());
        } finally {
            this.isRefreshing.set(false);
        }
    }

    canManageUser(user: UserAdminRow): boolean {
        return user.role === 'user';
    }

    startEditUser(user: UserAdminRow, event: Event) {
        event.stopPropagation();
        if (!this.canManageUser(user)) return;

        this.editingUserEmail.set(user.email);
        this.editUserName = user.name;
        this.editUserBalance = user.balance;
    }

    cancelEditUser() {
        this.editingUserEmail.set(null);
        this.editUserName = '';
        this.editUserBalance = 0;
    }

    isEditingUser(email: string): boolean {
        return this.editingUserEmail() === email;
    }

    async saveEditedUser(event: Event): Promise<void> {
        event.stopPropagation();

        const editingEmail = this.editingUserEmail();
        if (!editingEmail) return;

        const normalizedEmail = editingEmail.trim().toLowerCase();
        const name = this.editUserName.trim();
        if (!name) return;

        const safeBalance = Number.isFinite(this.editUserBalance)
            ? Math.max(0, Number(this.editUserBalance))
            : 0;

        const store = await this.readAccountStore();
        const account = store[normalizedEmail];
        if (!account) {
            this.cancelEditUser();
            return;
        }

        if ((account.user.role ?? 'user') === 'admin') return;

        account.user.name = name;
        account.user.balance = safeBalance;
        account.credits = safeBalance;

        await this.writeAccountStore(store);
        this.cancelEditUser();
        await this.refreshData();
    }

    async deleteUser(user: UserAdminRow, event: Event): Promise<void> {
        event.stopPropagation();
        if (!this.canManageUser(user)) return;

        const confirmed = window.confirm(`¿Seguro que quieres borrar a ${user.name}?`);
        if (!confirmed) return;

        const userEmail = user.email.trim().toLowerCase();
        const store = await this.readAccountStore();
        delete store[userEmail];
        await this.writeAccountStore(store);

        const cleanedBookings = this.getBookingsWithoutUser(userEmail);
        this.writeBookings(cleanedBookings);

        if (this.selectedUserEmail() === userEmail) {
            this.clearSelectedUser();
        }

        await this.refreshData();
    }

    trackByUser(_index: number, row: UserAdminRow) {
        return row.id;
    }

    trackByBooking(_index: number, booking: BookingRecord) {
        return booking.id;
    }

    selectUser(email: string) {
        this.selectedUserEmail.set(email);
    }

    clearSelectedUser() {
        this.selectedUserEmail.set(null);
    }

    isUserSelected(email: string): boolean {
        return this.selectedUserEmail() === email;
    }

    formatBookingDate(value: string): string {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;

        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
    }

    formatDelta(value: number): string {
        const sign = value > 0 ? '+' : '';
        return `${sign}${value.toFixed(1)}%`;
    }

    formatRefreshTime(value: Date | null): string {
        if (!value) return 'Sin actualizar';

        return new Intl.DateTimeFormat('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(value);
    }

    private async loadDashboardData(): Promise<void> {
        await syncBookingStoreFromRemote();

        const bookings = getStoredBookings();
        this.allBookings.set(bookings);

        const accounts = await this.readAccountStore();
        const users = this.mapUsersFromAccounts(accounts, bookings);
        this.allUsers.set(users);
    }

    private async readAccountStore(): Promise<PersistedAuthStore> {
        const remoteStore = await fetchRemoteStore<PersistedAuthStore>(AUTH_ACCOUNTS_API_PATH);
        if (remoteStore) return remoteStore;

        try {
            const raw = window.localStorage.getItem(AUTH_ACCOUNTS_STORAGE_KEY);
            return raw ? (JSON.parse(raw) as PersistedAuthStore) : {};
        } catch {
            return {};
        }
    }

    private async writeAccountStore(store: PersistedAuthStore): Promise<void> {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(AUTH_ACCOUNTS_STORAGE_KEY, JSON.stringify(store));
        }

        await putRemoteStore(AUTH_ACCOUNTS_API_PATH, store);
    }

    private getBookingsWithoutUser(email: string): BookingRecord[] {
        if (typeof window === 'undefined') return [];

        try {
            const raw = window.localStorage.getItem(HOTEL_BOOKING_STORAGE_KEY);
            const allBookings = raw ? (JSON.parse(raw) as BookingRecord[]) : [];
            return allBookings.filter((booking) => {
                const bookingEmail = (booking.userEmail ?? '').trim().toLowerCase();
                return bookingEmail !== email;
            });
        } catch {
            return [];
        }
    }

    private writeBookings(bookings: BookingRecord[]) {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(HOTEL_BOOKING_STORAGE_KEY, JSON.stringify(bookings));
        }

        void putRemoteStore(HOTEL_BOOKING_API_PATH, bookings);
    }

    private mapUsersFromAccounts(accounts: PersistedAuthStore, bookings: BookingRecord[]): UserAdminRow[] {
        const rows: UserAdminRow[] = [];

        Object.entries(accounts).forEach(([accountKey, state]) => {
            const email = (state.user.email || accountKey).trim().toLowerCase();
            const relatedBookings = bookings.filter((booking) => {
                const bookingEmail = (booking.userEmail ?? '').trim().toLowerCase();
                return bookingEmail === email;
            });

            const canceledBookings = relatedBookings.filter(
                (booking) => (booking.status ?? 'active') === 'canceled',
            ).length;
            const activeBookings = relatedBookings.length - canceledBookings;
            const totalSpent = relatedBookings
                .filter((booking) => (booking.status ?? 'active') !== 'canceled')
                .reduce((sum, booking) => sum + booking.totalAmount, 0);

            rows.push({
                id: state.user.id || accountKey,
                name: state.user.name || 'Usuario',
                email,
                role: state.user.role ?? (email === 'admin@admin.com' ? 'admin' : 'user'),
                balance: state.credits ?? 0,
                bookings: relatedBookings.length,
                activeBookings,
                canceledBookings,
                totalSpent,
            });
        });

        const knownEmails = new Set(rows.map((row) => row.email));

        bookings.forEach((booking) => {
            const bookingEmail = (booking.userEmail ?? '').trim().toLowerCase();
            if (!bookingEmail || knownEmails.has(bookingEmail)) return;

            const relatedBookings = bookings.filter((item) => (item.userEmail ?? '').trim().toLowerCase() === bookingEmail);
            const canceledBookings = relatedBookings.filter(
                (item) => (item.status ?? 'active') === 'canceled',
            ).length;
            const activeBookings = relatedBookings.length - canceledBookings;
            const totalSpent = relatedBookings
                .filter((item) => (item.status ?? 'active') !== 'canceled')
                .reduce((sum, item) => sum + item.totalAmount, 0);

            rows.push({
                id: bookingEmail,
                name: bookingEmail.split('@')[0] || 'Usuario',
                email: bookingEmail,
                role: bookingEmail === 'admin@admin.com' ? 'admin' : 'user',
                balance: 0,
                bookings: relatedBookings.length,
                activeBookings,
                canceledBookings,
                totalSpent,
            });
            knownEmails.add(bookingEmail);
        });

        return rows;
    }

    private getCurrentRange(period: DashboardPeriod): { start: Date; end: Date } {
        const now = new Date();
        const end = new Date(now);
        end.setHours(23, 59, 59, 999);

        if (period === 'year') {
            return {
                start: new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0),
                end,
            };
        }

        if (period === 'semester') {
            const isSecondSemester = now.getMonth() >= 6;
            return {
                start: new Date(now.getFullYear(), isSecondSemester ? 6 : 0, 1, 0, 0, 0, 0),
                end,
            };
        }

        if (period === 'quarter') {
            const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
            return {
                start: new Date(now.getFullYear(), quarterStartMonth, 1, 0, 0, 0, 0),
                end,
            };
        }

        return {
            start: new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0),
            end,
        };
    }

    private getPreviousRange(currentStart: Date, currentEnd: Date): { start: Date; end: Date } {
        const durationMs = currentEnd.getTime() - currentStart.getTime();
        const previousEnd = new Date(currentStart.getTime() - 1);
        const previousStart = new Date(previousEnd.getTime() - durationMs);
        return { start: previousStart, end: previousEnd };
    }

    private filterBookingsByRange(bookings: BookingRecord[], start: Date, end: Date): BookingRecord[] {
        return bookings.filter((booking) => {
            const bookingDate = new Date(booking.bookingDate);
            if (Number.isNaN(bookingDate.getTime())) return false;
            return bookingDate.getTime() >= start.getTime() && bookingDate.getTime() <= end.getTime();
        });
    }

    private getPercentageChange(previous: number, current: number): number {
        if (previous === 0 && current === 0) return 0;
        if (previous === 0) return 100;
        return ((current - previous) / previous) * 100;
    }
}
