import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {Post} from 'src/app/core/models/interfaces/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  public createPost(post: Post): Observable<Object> {
    return this.http.post((environment.apiURL + '/posts.json'), post);
  }
}
