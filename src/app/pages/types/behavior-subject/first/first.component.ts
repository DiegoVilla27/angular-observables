import { Component } from "@angular/core";
import { IComment } from "../../../../interfaces/comment.interface";
import { ReplaySubject, takeUntil } from "rxjs";
import { BehaviorSubjectService } from "../../../../services/behavior-subject.service";

@Component({
  selector: "behavior-subject-first",
  templateUrl: "./first.component.html",
  styleUrl: "./first.component.scss"
})
export class FirstComponent {
  comments: IComment[] = [];
  stop$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  constructor(private _behaviorSubjectSvc: BehaviorSubjectService) {}

  ngOnInit(): void {
    this._behaviorSubjectSvc
      .getComments()
      .pipe(takeUntil(this.stop$))
      .subscribe((comments: IComment[]) => (this.comments = comments));
    this._behaviorSubjectSvc.loadComments();
  }

  ngOnDestroy(): void {
    this.stop$.unsubscribe();
  }

  addComment(): void {
    this._behaviorSubjectSvc.saveComment();
  }
}
