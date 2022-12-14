import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';
import { categories } from '../../core/models/categories';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss'],
})
export class QuestionPageComponent implements OnInit {
  public form: FormGroup;
  public isTagFlag = false;
  public tagsDev = categories;
  private destroy = new Subject<boolean>();
  
  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

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

    this.isTagFlag = Boolean(Object.keys(this.form.get('tags').value).length);
  }

  public isControlValid(name: string): boolean {
    const control = this.form.controls[name];

    return control.invalid && control.touched;
  }

  onSubmit() {
    this.postService
      .createPost({
        ...this.form.value,
        date: new Date(),
      }).pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        this.router.navigate(['/home']);
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
