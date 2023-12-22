import { Component } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { IComment } from "../../../../interfaces/comment.interface";
import { BehaviorSubjectService } from "../../../../services/behavior-subject.service";

@Component({
  selector: "behavior-subject-first",
  templateUrl: "./first.component.html",
  styleUrl: "./first.component.scss"
})
export class FirstComponent {
  comments: IComment[] = [];
  stopObs$: Subject<void> = new Subject<void>();

  constructor(private _behaviorSubjectSvc: BehaviorSubjectService) {}

  ngOnInit(): void {
    this._behaviorSubjectSvc
      .getComments()
      .pipe(takeUntil(this.stopObs$))
      .subscribe((comments: IComment[]) => (this.comments = comments));
    this._behaviorSubjectSvc.loadComments();
  }

  ngOnDestroy(): void {
    this.stopObs$.next();
    this.stopObs$.complete();
  }

  addComment(): void {
    this._behaviorSubjectSvc.saveComment();
  }
}
