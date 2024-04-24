import { Injectable } from '@angular/core';
import { ApiRepoService } from './api-repo.service';
import { BehaviorSubject } from 'rxjs';
import { Song, SongCreateDto, SongUpdateDto } from './model/song';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private songList$: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);

  constructor(private ApiRepoSrv: ApiRepoService) {}

  private fetchData() {
    this.ApiRepoSrv.getData().subscribe((data) => {
      this.songList$.next(data);
    });
  }

  getData() {
    this.fetchData();
    return this.songList$.asObservable();
  }

  postData(data: SongCreateDto) {
    this.ApiRepoSrv.postData(data).subscribe(() => {
      this.fetchData();
    });
    return this.songList$.asObservable();
  }

  deleteData(id: string) {
    this.ApiRepoSrv.deleteId(id).subscribe(() => {
      this.fetchData();
    });
    return this.songList$.asObservable();
  }

  updateData(data: SongUpdateDto, id: string) {
    this.ApiRepoSrv.updateData(data, id).subscribe(() => {
      this.fetchData();
    });
    return this.songList$.asObservable();
  }
}
