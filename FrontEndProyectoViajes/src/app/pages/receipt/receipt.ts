import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import {
  getHotelById,
  getCityById,
  getCountryById,
  Hotel,
  City,
  Country,
} from '../../data/destinations';
import {
  LucideAngularModule,
  ArrowLeft,
  Calendar,
  User,
  CreditCard,
  CheckCircle2,
  BedDouble,
} from 'lucide-angular';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface BookingDetails {
  confirmationCode: string;
  bookingDate: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  roomType: string;
  totalAmount: number;
  paymentMethod: string;
  paymentDate: string;
}

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, TranslatePipe],
  templateUrl: './receipt.html',
  styleUrl: './receipt.css',
})
export class Receipt implements OnInit {
  route = inject(ActivatedRoute);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly CalendarIcon = Calendar;
  readonly UserIcon = User;
  readonly CreditCardIcon = CreditCard;
  readonly CheckCircle2Icon = CheckCircle2;
  readonly BedDoubleIcon = BedDouble;

  hotel: Hotel | undefined;
  city: City | undefined;
  country: Country | undefined;

  bookingDetails!: BookingDetails;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const hotelId = params.get('hotelId') || params.get('id');
      if (hotelId) {
        this.hotel = getHotelById(hotelId);
        if (this.hotel) {
          this.city = getCityById(this.hotel.cityId);
          if (this.city) {
            this.country = getCountryById(this.city.countryId);
          }

          this.bookingDetails = {
            confirmationCode: `JMJ${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
            bookingDate: '10 Abril 2026',
            checkIn: '15 Mayo 2026',
            checkOut: '18 Mayo 2026',
            nights: 3,
            guests: 2,
            roomType: 'Suite Deluxe con vista',
            totalAmount: this.hotel.pricePerNight * 3,
            paymentMethod: '**** **** **** 4532',
            paymentDate: '10 Abril 2026, 14:32',
          };
        }
      }
    });
  }
}
