import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categories } from '../../core/modules/categories';
@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss'],
})
export class QuestionPageComponent implements OnInit {
  public form: FormGroup;

  public tags = categories;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [
        '',
        [Validators.required],
        [Validators.minLength(5)],
        [Validators.maxLength(18)],
      ],
      text: [
        '',
        [Validators.required],
        [Validators.minLength(10)],
        [Validators.maxLength(120)],
      ],
      tag: this.fb.group({}),
    });
  }

  post() {
    console.log(this.form.value);
  }
}
