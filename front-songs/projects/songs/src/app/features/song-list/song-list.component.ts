import { Component, Input, inject } from '@angular/core';
import { Song } from '../../core/services/model/song';
import { SongCardComponent } from '../song-card/song-card.component';
import { StateService } from '../../core/services/state.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'isdi-song-list',
  standalone: true,
  template: `
    <isdi-form />
    <ul class="song-list">
      @for (song of songs; track $index) {
      <li>
        <i
          class="fa-solid fa-xmark close-btn"
          (click)="deleteSong(song.id)"
          (keyup)="deleteSong(song.id)"
          tabindex="0"
        ></i>
        <isdi-song-card [songInfo]="song" (update)="updateSong($event)" />
      </li>
      }
    </ul>
  `,
  styleUrl: './song-list.component.css',
  imports: [SongCardComponent, FormComponent],
})
export class SongListComponent {
  @Input() songs!: Song[];

  private stateSrv = inject(StateService);

  deleteSong(id: string) {
    console.log(id);
    this.stateSrv.deleteData(id);
  }

  updateSong(updateSong: Song) {
    this.stateSrv.updateData(updateSong, updateSong.id);
  }
}
