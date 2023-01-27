import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { categories } from 'src/app/core/models/categories';
import { Post } from 'src/app/core/models/interfaces/post.interface';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-edit-post-page',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  public form: FormGroup;
  public isTagFlag = false;
  public tagsDev = categories;
  private destroy = new Subject<boolean>();
  private postId: string;
  public post: Post;
  private tags: string[];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];

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

    this.postService
      .getPost(this.postId)
      .pipe(takeUntil(this.destroy))
      .subscribe((post) => {
        this.post = post;
        this.tags = post.tags;
        this.form.patchValue({
          title: post.title,
          text: post.text,
        });
        this.tags.forEach((tag) => {
          (<FormGroup>this.form.get('tags')).addControl(
            tag,
            new FormControl(true)
          );
        });
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
    const formData = { ...this.form.value };
    formData.tags = Object.keys(formData.tags);

    const body = {
      ...formData,
      date: new Date(),
    };

    this.postService
      .updatePost(this.postId, body)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['/post-page/', this.postId]);
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
