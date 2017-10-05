import { TestBed, inject } from '@angular/core/testing';

import { PlayerService } from './player.service';

describe('ListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService]
    });
  });

  it('should be created', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));
});
