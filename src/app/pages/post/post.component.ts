import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/core/models/interfaces/post.interface';
import { PostService } from 'src/app/core/services/post.service';
import { Comment } from 'src/app/core/models/interfaces/comment.interface'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  private destroy = new Subject<boolean>();
  public postId: string;
  public post: Post;
  public form: FormGroup;
  public comments: Comment[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getId();
    this.initForm();
    this.postService
      .getPost(this.postId)
      .pipe(takeUntil(this.destroy))
      .subscribe((post) => {
        this.post = post;
        this.comments = post.comments;
      });

  }

  public getId(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy)).subscribe(
      (param) => (this.postId = Object.values(param)[0])
    );
  }

  public initForm(): void {
    this.form = this.formBuilder.group({
      commentText: ['']
    });
  }

  public onSubmit(): void {
    const commentObj = {
        text: this.form.get('commentText').value,
        date: new Date(),
    }
    this.postService.createComment(this.postId, commentObj)
      .pipe(takeUntil(this.destroy))
      .subscribe((id) => {
        const comment = commentObj as Comment;
        comment.id = Object.values(id)[0];
        this.form.reset();
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
