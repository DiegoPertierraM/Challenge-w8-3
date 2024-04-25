import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'isdi-header',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <header>
      <h1>
        <span>Songify </span>
        @if ( (stateService.getState() | async)!.loginState === 'logged') {
        <button (click)="onClickLogout()">Logout'</button>
        <button (click)="onClickSongs()">Canciones</button>
        } @else {
        <div>
          <button (click)="onClickRegister()">Registro</button>
          <button (click)="onClickLogin()">Login</button>
        </div>
        }
      </h1>
    </header>
  `,
  styles: `
  h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #333;
    color: #fff;
  }`,
})
export class HeaderComponent {
  stateService = inject(StateService);
  router = inject(Router);

  onClickLogin() {
    this.stateService.setLoginState('logging');
  }

  onClickLogout() {
    this.stateService.setLogout();
  }

  onClickSongs() {
    this.stateService.loadSongs();
  }

  onClickRegister() {
    this.router.navigate(['register']);
  }
}
