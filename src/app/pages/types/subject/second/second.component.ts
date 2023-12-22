import { Component, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { IUser } from "../../../../interfaces/user.interface";
import { TypeSubjectService } from "../../../../services/subject.service";

@Component({
  selector: "subject-second",
  templateUrl: "./second.component.html",
  styleUrl: "./second.component.scss"
})
export class SecondComponent implements OnDestroy {
  users: IUser[] = [];
  stopObs$: Subject<void> = new Subject<void>();

  constructor(private _typeSubjectSvc: TypeSubjectService) {}

  ngOnDestroy(): void {
    this.stopObs$.next();
    this.stopObs$.complete();
  }

  watchUsers(): void {
    this._typeSubjectSvc.usersObs$
      .pipe(takeUntil(this.stopObs$))
      .subscribe((users: IUser[]) => (this.users = users));
  }
}
