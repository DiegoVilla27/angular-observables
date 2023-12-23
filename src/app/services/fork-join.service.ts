import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { IComment } from "../interfaces/comment.interface";
import { IPost } from "../interfaces/post.interface";
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root"
})
export class ForkJoinService {
  private URL: string = environment.api_key;

  constructor(private _http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(`${this.URL}/users`);
  }

  getPosts(): Observable<IPost[]> {
    return this._http.get<IPost[]>(`${this.URL}/posts`);
  }

  getComments(): Observable<IComment[]> {
    return this._http.get<IComment[]>(`${this.URL}/comments`);
  }
}
