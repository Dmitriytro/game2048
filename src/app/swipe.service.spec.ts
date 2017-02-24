/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SwipeService } from './swipe.service';

describe('SwipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwipeService]
    });
  });

  it('should ...', inject([SwipeService], (service: SwipeService) => {
    expect(service).toBeTruthy();
  }));
});
