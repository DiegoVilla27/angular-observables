import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { IPost } from "../interfaces/post.interface";
import { IComment } from "../interfaces/comment.interface";

@Injectable({
  providedIn: "root"
})
export class SwitchMapService {
  private URL: string = environment.api_key;

  constructor(private _http: HttpClient) {}

  getPosts(): Observable<IPost> {
    return this._http.get<IPost>(`${this.URL}/posts/1`);
  }

  getComments(idPost: string): Observable<IComment[]> {
    return this._http.get<IComment[]>(`${this.URL}/comments?postId=${idPost}`);
  }
}
