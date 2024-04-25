import { TestBed } from '@angular/core/testing';

import { RepoSongsService } from './repo.songs.service';

describe('RepoSongsService', () => {
  let service: RepoSongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepoSongsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
