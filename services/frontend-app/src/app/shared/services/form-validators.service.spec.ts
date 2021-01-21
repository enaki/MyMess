import { TestBed } from '@angular/core/testing';

import { FormValidatorsService } from './form-validators.service';

describe('FormValidatorsService', () => {
  let service: FormValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
