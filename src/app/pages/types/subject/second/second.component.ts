import { Component, OnDestroy } from "@angular/core";
import { IUser } from "../../../../interfaces/user.interface";
import { TypeSubjectService } from "../../../../services/type-subject.service";
import { ReplaySubject, takeUntil } from "rxjs";

@Component({
  selector: "subject-second",
  templateUrl: "./second.component.html",
  styleUrl: "./second.component.scss"
})
export class SecondComponent implements OnDestroy {
  users: IUser[] = [];
  stop$: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);

  constructor(private _typeSubjectSvc: TypeSubjectService) {}

  ngOnDestroy(): void {
    this.stop$.unsubscribe();
  }

  watchUsers(): void {
    this._typeSubjectSvc.usersObs$
      .pipe(takeUntil(this.stop$))
      .subscribe((users: IUser[]) => (this.users = users));
  }
}
