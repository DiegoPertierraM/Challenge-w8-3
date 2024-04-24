import { TestBed } from '@angular/core/testing';

import { ApiRepoService } from './api-repo.service';

describe('ApiRepoService', () => {
  let service: ApiRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
