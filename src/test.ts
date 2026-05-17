import { beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),

      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {},
            queryParams: {},
            paramMap: convertToParamMap({ id: '1' }),
            queryParamMap: convertToParamMap({}),
          },
          params: of({}),
          queryParams: of({}),
          paramMap: of(convertToParamMap({ id: '1' })),
          queryParamMap: of(convertToParamMap({})),
        },
      },

      provideHttpClient(),
      provideHttpClientTesting(),
      provideNoopAnimations(),
    ],
  });
});
