import { TestBed } from '@angular/core/testing';

import { MovieOfferService } from './movie-offer.service';

describe('MovieOfferService', () => {
  let service: MovieOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
