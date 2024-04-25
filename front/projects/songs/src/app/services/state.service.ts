import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { RepoUsersService } from './repo.users.service';
import { RepoSongsService } from './repo.songs.service';

type LoginState = 'idle' | 'logging' | 'logged' | 'error';

export type Payload = {
  id: string;
  role: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string | null;
  currenPayload: Payload | null;
  currenUser: unknown | null;
};

const initialState: State = {
  loginState: 'idle',
  token: null,
  currenPayload: null,
  currenUser: null,
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state$ = new BehaviorSubject<State>(initialState);
  private repoSongs = inject(RepoSongsService);
  private repoUsers = inject(RepoUsersService);

  constructor() {}

  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  getToken = (): string | null => this.state$.value.token;

  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }

  setLogin(token: string) {
    const currenPayload = jwtDecode(token) as Payload;
    localStorage.setItem('week7.ng', JSON.stringify({ token }));
    this.repoUsers.getById(currenPayload.id).subscribe((user) => {
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token,
        currenPayload,
        currenUser: user,
      });
    });
  }

  setLogout() {
    localStorage.removeItem('week7.ng');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: null,
      currenPayload: null,
    });
  }

  loadSongs() {
    this.repoSongs.getSongs().subscribe((songs) => {
      console.log(songs);
    });
  }
}
