import { Component, OnDestroy } from "@angular/core";
import { IPost } from "../../../../interfaces/post.interface";
import { ReplaySubject, takeUntil } from "rxjs";
import { ReplaySubjectService } from "../../../../services/replay-subject.service";

@Component({
  selector: "replay-subject-second",
  templateUrl: "./second.component.html",
  styleUrl: "./second.component.scss"
})
export class SecondComponent implements OnDestroy {
  posts: IPost[] = [];
  stop$: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);

  constructor(private _replaySubjectSvc: ReplaySubjectService) {}

  ngOnDestroy(): void {
    this.stop$.unsubscribe();
  }

  watchPosts(): void {
    this._replaySubjectSvc
      .getPosts()
      .pipe(takeUntil(this.stop$))
      .subscribe((posts: IPost[]) => (this.posts = posts.slice(-2)));
  }
}
