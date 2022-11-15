import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/core/models/interfaces/post.interface';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  private destroy = new Subject<boolean>();
  public postId: string;
  public post: Post;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getId();
    this.postService
      .getPost(this.postId)
      .pipe(takeUntil(this.destroy))
      .subscribe((post) => {
        this.post = post;
      });

      
  }

  public getId(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy)).subscribe(
      (param) => (this.postId = Object.values(param)[0])
    );
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
