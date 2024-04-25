import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root',
})
export class RepoSongsService {
  httpClient = inject(HttpClient);
  url = environment.apiUrl + '/songs';

  getSongs() {
    return this.httpClient.get<Song[]>(this.url);
  }
}
