import { Component } from "@angular/core";
import { IComment } from "../../../../interfaces/comment.interface";
import { ReplaySubject, takeUntil } from "rxjs";
import { BehaviorSubjectService } from "../../../../services/behavior-subject.service";

@Component({
  selector: "behavior-subject-second",
  templateUrl: "./second.component.html",
  styleUrl: "./second.component.scss"
})
export class SecondComponent {
  comments: IComment[] = [];
  stop$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  constructor(private _behaviorSubjectSvc: BehaviorSubjectService) {}

  ngOnDestroy(): void {
    this.stop$.unsubscribe();
  }

  watchComments(): void {
    this._behaviorSubjectSvc
      .getComments()
      .pipe(takeUntil(this.stop$))
      .subscribe((comments: IComment[]) => (this.comments = comments));
  }
}
