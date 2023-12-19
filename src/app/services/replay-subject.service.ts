import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { IPost } from "../interfaces/post.interface";

const posts: IPost[] = [
  {
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  }
];

/**
 * ReplaySubject
 * - Mutable
 * - It doesn't have an initial value, so, subscribers only receive values emitted after they subscribe but just a specify quantity (last one values).
 */

@Injectable({
  providedIn: "root"
})
export class ReplaySubjectService {
  postObs$: ReplaySubject<IPost[]> = new ReplaySubject<IPost[]>(2);

  constructor() {}

  getPosts(): Observable<IPost[]> {
    return this.postObs$.asObservable();
  }

  loadPosts(): void {
    this.postObs$.next(posts);
  }

  savePost(): void {
    const id = Math.floor(Math.random() * 100) + 1;
    const newPost: IPost = { id, title: "New Post", body: "New Body" };
    posts.push(newPost);
    this.postObs$.next([...posts]);
  }
}
