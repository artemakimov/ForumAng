import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/core/models/interfaces/post.interface';
import { PostService } from 'src/app/core/services/post.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public posts: Post[];
  private destroy = new Subject<boolean>();

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postService.getAllPosts()
      .pipe(takeUntil(this.destroy))
      .subscribe((posts) => {
      this.posts = posts;
      posts.forEach(console.log)
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
