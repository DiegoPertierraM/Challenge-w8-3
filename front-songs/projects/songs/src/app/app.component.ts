import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StateService } from './core/services/state.service';
import { Song } from './core/services/model/song';
import { SongListComponent } from './features/song-list/song-list.component';

@Component({
  selector: 'isdi-root',
  standalone: true,
  imports: [RouterOutlet, SongListComponent],
  template: `
    <h1>SONGS LIST:</h1>
    <isdi-song-list [songs]="songs" />
  `,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  songs: Song[] = [];

  private stateSrv = inject(StateService);

  ngOnInit(): void {
    this.stateSrv.getData().subscribe((data) => {
      this.songs = data;
      console.log(data);
    });
  }
}
