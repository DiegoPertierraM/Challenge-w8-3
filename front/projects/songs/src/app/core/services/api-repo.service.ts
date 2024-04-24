import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song, SongCreateDto, SongUpdateDto } from './model/song';

@Injectable({
  providedIn: 'root',
})
export class ApiRepoService {
  private urlBase = 'https://challenge-w6-5.onrender.com/songs';

  constructor(private http: HttpClient) {}

  getData(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.urlBase}`);
  }

  getDataById(id: string): Observable<Song> {
    return this.http.get<Song>(`${this.urlBase}/${id}`);
  }

  postData(data: SongCreateDto): Observable<Song> {
    return this.http.post<Song>(`${this.urlBase}`, data);
  }

  updateData(data: SongUpdateDto, id: string): Observable<Song> {
    return this.http.patch<Song>(`${this.urlBase}/${id}`, data);
  }

  deleteId(id: string): Observable<Song> {
    return this.http.delete<Song>(`${this.urlBase}/${id}`);
  }
}
