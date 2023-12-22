import { Component } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { IComment } from "../../../../interfaces/comment.interface";
import { BehaviorSubjectService } from "../../../../services/behavior-subject.service";

@Component({
  selector: "behavior-subject-second",
  templateUrl: "./second.component.html",
  styleUrl: "./second.component.scss"
})
export class SecondComponent {
  comments: IComment[] = [];
  stopObs$: Subject<void> = new Subject<void>();

  constructor(private _behaviorSubjectSvc: BehaviorSubjectService) {}

  ngOnDestroy(): void {
    this.stopObs$.next();
    this.stopObs$.complete();
  }

  watchComments(): void {
    this._behaviorSubjectSvc
      .getComments()
      .pipe(takeUntil(this.stopObs$))
      .subscribe((comments: IComment[]) => (this.comments = comments));
  }
}
