import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { IPost } from "../../../../interfaces/post.interface";
import { ReplaySubjectService } from "../../../../services/replay-subject.service";

@Component({
  selector: "replay-subject-first",
  templateUrl: "./first.component.html",
  styleUrl: "./first.component.scss"
})
export class FirstComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  stopObs$: Subject<void> = new Subject<void>();

  constructor(private _replaySubjectSvc: ReplaySubjectService) {}

  ngOnInit(): void {
    this._replaySubjectSvc.loadPosts();
    this._replaySubjectSvc
      .getPosts()
      .pipe(takeUntil(this.stopObs$))
      .subscribe((posts: IPost[]) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.stopObs$.next();
    this.stopObs$.complete();
  }

  addPost(): void {
    this._replaySubjectSvc.savePost();
  }
}
