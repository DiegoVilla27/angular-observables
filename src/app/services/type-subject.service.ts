import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IUser } from "../interfaces/user.interface";

const users: IUser[] = [
  { id: "1", name: "John 1", age: 36 },
  { id: "2", name: "John 2", age: 20 },
  { id: "3", name: "John 3", age: 18 }
];

/**
 * Subject
 * - Mutable
 * - It doesn't have an initial value, so, subscribers only receive values emitted after they subscribe.
 */

@Injectable({
  providedIn: "root"
})
export class TypeSubjectService {
  usersObs$: Subject<IUser[]> = new Subject<IUser[]>();

  constructor() {}

  loadUsers(): void {
    this.usersObs$.next(users);
  }

  saveUser(): void {
    const id = (Math.floor(Math.random() * 100) + 1).toString();
    this.usersObs$.next([...users, { id, name: `John ${id}`, age: 20 }]);
  }
}
