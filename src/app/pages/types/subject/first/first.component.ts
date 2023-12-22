import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { IUser } from "../../../../interfaces/user.interface";
import { TypeSubjectService } from "../../../../services/subject.service";

@Component({
  selector: "subject-first",
  templateUrl: "./first.component.html",
  styleUrl: "./first.component.scss"
})
export class FirstComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  stopObs$: Subject<void> = new Subject<void>();

  constructor(private _typeSubjectSvc: TypeSubjectService) {}

  ngOnInit(): void {
    this._typeSubjectSvc.usersObs$
      .pipe(takeUntil(this.stopObs$))
      .subscribe((users: IUser[]) => (this.users = users));
    this._typeSubjectSvc.loadUsers();
  }

  ngOnDestroy(): void {
    this.stopObs$.next();
    this.stopObs$.complete();
  }

  addUser(): void {
    this._typeSubjectSvc.saveUser();
  }
}
