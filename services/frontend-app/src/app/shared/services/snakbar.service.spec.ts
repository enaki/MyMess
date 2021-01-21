import { TestBed } from '@angular/core/testing';

import { SnakbarService } from './snakbar.service';

describe('SnakbarService', () => {
  let service: SnakbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnakbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
