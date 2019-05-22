import { TestBed } from '@angular/core/testing';

import { HexcrawlService } from './hexcrawl.service';

describe('HexcrawlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HexcrawlService = TestBed.get(HexcrawlService);
    expect(service).toBeTruthy();
  });
});
