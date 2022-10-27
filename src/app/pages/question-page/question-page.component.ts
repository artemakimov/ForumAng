import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { categories } from '../../core/models/categories';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss'],
})
export class QuestionPageComponent implements OnInit {

  public form: FormGroup;
  public tagFlag = false;
  public tagsDev = categories;

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      text: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(120),
        ],
      ],
      tags: this.fb.group({}),
    });
  }

  post() {
    console.log(this.form.value);
  }

  onChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      (<FormGroup>this.form.get('tags')).addControl(
        `${checkbox.id}`,
        new FormControl(true)
      );
    } else {
      (<FormGroup>this.form.get('tags')).removeControl(`${checkbox.id}`);
    }

    this.tagFlag = Boolean(Object.keys(this.form.get('tags').value).length);
  }

  public isControlValid(name: string): boolean {
    const control = this.form.controls[name];

    return control.invalid && control.touched;
  }



}
