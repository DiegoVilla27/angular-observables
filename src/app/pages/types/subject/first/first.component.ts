import { Component, OnDestroy, OnInit } from "@angular/core";
import { IUser } from "../../../../interfaces/user.interface";
import { TypeSubjectService } from "../../../../services/type-subject.service";
import { ReplaySubject, takeUntil } from "rxjs";

@Component({
  selector: "subject-first",
  templateUrl: "./first.component.html",
  styleUrl: "./first.component.scss"
})
export class FirstComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  stop$: ReplaySubject<boolean> = new ReplaySubject<boolean>(0);

  constructor(private _typeSubjectSvc: TypeSubjectService) {}

  ngOnInit(): void {
    this._typeSubjectSvc.usersObs$
      .pipe(takeUntil(this.stop$))
      .subscribe((users: IUser[]) => (this.users = users));
    this._typeSubjectSvc.loadUsers();
  }

  ngOnDestroy(): void {
    this.stop$.unsubscribe();
  }

  addUser(): void {
    this._typeSubjectSvc.saveUser();
  }
}
