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
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  public form: FormGroup;
  public isTagChecked = false;
  public tagsDev = categories;
  private destroy = new Subject<void>();

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

    this.isTagChecked = Boolean(
      Object.keys(this.form.get('tags').value).length
    );
  }

  public isControlValid(name: string): boolean {
    const control = this.form.controls[name];

    return control.invalid && control.touched;
  }

  onSubmit() {
    const body = {
      ...this.form.value,
      date: new Date(),
    };

    this.postService
      .createPost(body)
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        this.router.navigate(['/home']);
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
