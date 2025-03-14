import { TestBed } from '@angular/core/testing';

import { MomentumApiService } from './momentum-api.service';

describe('MomentumApiService', () => {
  let service: MomentumApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentumApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
