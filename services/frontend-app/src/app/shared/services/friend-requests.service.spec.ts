import { TestBed } from '@angular/core/testing';

import { FriendRequestsService } from './friend-requests.service';

describe('FriendRequestsService', () => {
  let service: FriendRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
