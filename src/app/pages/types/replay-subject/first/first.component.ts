import { Component, OnDestroy, OnInit } from "@angular/core";
import { ReplaySubject, takeUntil } from "rxjs";
import { IPost } from "../../../../interfaces/post.interface";
import { ReplaySubjectService } from "../../../../services/replay-subject.service";

@Component({
  selector: "replay-subject-first",
  templateUrl: "./first.component.html",
  styleUrl: "./first.component.scss"
})
export class FirstComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  stop$: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);

  constructor(private _replaySubjectSvc: ReplaySubjectService) {}

  ngOnInit(): void {
    this._replaySubjectSvc.loadPosts();
    this._replaySubjectSvc
      .getPosts()
      .pipe(takeUntil(this.stop$))
      .subscribe((posts: IPost[]) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.stop$.unsubscribe();
  }

  addPost(): void {
    this._replaySubjectSvc.savePost();
  }
}
