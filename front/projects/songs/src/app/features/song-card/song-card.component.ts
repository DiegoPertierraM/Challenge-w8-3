import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Song } from '../../core/services/model/song';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'isdi-song-card',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (songInfo) {
    <ul class="song-card">
      <i
        class="fa-solid fa-pen-to-square"
        [class.edit-mode-icon]="editMode"
        (click)="toggleEditMode()"
        (keyup)="toggleEditMode()"
        tabindex="-1"
      ></i>
      @if (!editMode) {
      <li class="song-name">{{ songInfo.title }}</li>
      <li>{{ songInfo.author }}</li>
      <li>{{ songInfo.year }}</li>
      } @else {
      <input type="text" [(ngModel)]="songInfo.title" />
      <input type="text" [(ngModel)]="songInfo.author" />
      <input type="text" [(ngModel)]="songInfo.year" />
      <button (click)="updateSong()">Update</button>
      }
    </ul>
    }
  `,
  styleUrl: './song-card.component.css',
})
export class SongCardComponent {
  @Input() songInfo!: Song;
  @Output() update = new EventEmitter<Song>();
  editMode = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  updateSong() {
    this.update.emit(this.songInfo);
    this.toggleEditMode();
  }
}
