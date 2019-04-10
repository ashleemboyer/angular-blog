import { TestBed } from '@angular/core/testing';

import { GoodskeeperService } from './goodskeeper.service';

describe('GoodskeeperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoodskeeperService = TestBed.get(GoodskeeperService);
    expect(service).toBeTruthy();
  });
});
