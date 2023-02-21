import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/core/models/interfaces/post.interface';
import { PostService } from 'src/app/core/services/post.service';
import { Comment } from 'src/app/core/models/interfaces/comment.interface';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  private destroy = new Subject<void>();
  public postId: string;
  public post: Post;
  public form: FormGroup;
  public comments: Comment[];
  public isLoggedIn = false;
  public currentUserEmail: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
        console.log('post from component', post);
      });

      this.authService
      .getAuthState()
      .pipe(takeUntil(this.destroy))
      .subscribe((user) => {
        this.isLoggedIn = !!user;
        if (user) {
          this.currentUserEmail = user.email;
        }
      });
  }

  public getId(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy))
      .subscribe((param) => (this.postId = Object.values(param)[0]));
  }

  public initForm(): void {
    this.form = this.formBuilder.group({
      commentText: [''],
    });
  }

  public onSubmit(): void {
    const commentObj = {
      text: this.form.get('commentText').value,
      date: new Date(),
    };
    this.postService
      .createComment(this.postId, commentObj)
      .pipe(takeUntil(this.destroy))
      .subscribe((id) => {
        const comment = commentObj as Comment;
        comment.id = Object.values(id)[0];
        this.form.reset();
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
