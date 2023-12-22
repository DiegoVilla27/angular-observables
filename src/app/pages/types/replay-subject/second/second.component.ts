import { Component, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { IPost } from "../../../../interfaces/post.interface";
import { ReplaySubjectService } from "../../../../services/replay-subject.service";

@Component({
  selector: "replay-subject-second",
  templateUrl: "./second.component.html",
  styleUrl: "./second.component.scss"
})
export class SecondComponent implements OnDestroy {
  posts: IPost[] = [];
  stopObs$: Subject<void> = new Subject<void>();

  constructor(private _replaySubjectSvc: ReplaySubjectService) {}

  ngOnDestroy(): void {
    this.stopObs$.next();
    this.stopObs$.complete();
  }

  watchPosts(): void {
    this._replaySubjectSvc
      .getPosts()
      .pipe(takeUntil(this.stopObs$))
      .subscribe((posts: IPost[]) => (this.posts = posts.slice(-2)));
  }
}
