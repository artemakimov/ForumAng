import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/core/models/interfaces/post.interface';
import { map, Observable } from 'rxjs';
import {Comment} from "../models/interfaces/comment.interface";

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}



  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiURL + '/posts.json').pipe(
      map((result) => {
        let res: { [p: string]: Post };
        res = result as unknown as { [key: string]: Post };
        return Object.keys(res).map((id) => {
          const tags = Object.keys(res[id].tags);

          return {
            id,
            ...res[id],
            tags,
          } as Post;
        });
      })
    );
  }

  public getPost(id: string): Observable<Post> {
    return this.http
      .get<Post>(`${environment.apiURL}/posts/${id}.json`)
      .pipe(
        map((post) => {
          const tags = Object.keys(post.tags);
          let comments: Comment[] = [];

          if (post.comments) {
            comments = Object.keys(post.comments).map((id:any) =>{
              return post.comments[id]
            });
          }

          return {
            ...post,
            id,
            comments,
            tags
          };
        })
      );
  }

  public createComment(id: string, comment: object): Observable<Object> {
    return this.http.post((environment.apiURL + '/posts/' + id + '/comments.json'), comment)
  }


  public deletePost(id: string): Observable<Object> {
    return this.http.delete((environment.apiURL + '/posts/' + id + '.json'));
  }

  public createPost(post: Post): Observable<Object> {
    return this.http.post(environment.apiURL + '/posts.json', post);
  }

  public updatePost(id: string, post: Post): Observable<Object> {
    return this.http.patch<Post>((environment.apiURL + '/posts/' + id + '.json'), post);
  }
}
