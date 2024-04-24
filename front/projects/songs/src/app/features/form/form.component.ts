import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'isdi-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<form
    [formGroup]="songForm"
    (ngSubmit)="onSubmit()"
    class="form-container"
  >
    <div>
      <label for="title">Title:</label>
      <input type="text" id="title" formControlName="title" />
    </div>
    <div>
      <label for="author">Author:</label>
      <input type="text" id="author" formControlName="author" />
    </div>
    <div>
      <label for="year">Year:</label>
      <input type="text" id="year" formControlName="year" />
    </div>
    <button type="submit" [disabled]="songForm.invalid">Submit</button>
  </form>`,
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  songForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private stateSrv: StateService
  ) {}

  ngOnInit(): void {
    this.songForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    });
  }

  onSubmit() {
    if (this.songForm.invalid) {
      return;
    }

    const formData = this.songForm.value;
    this.stateSrv.postData(formData).subscribe(() => {
      this.songForm.reset();
    });
  }
}
