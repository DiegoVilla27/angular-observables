import { Component } from "@angular/core";
import { Subject, forkJoin } from "rxjs";
import { IComment } from "../../../interfaces/comment.interface";
import { IPost } from "../../../interfaces/post.interface";
import { IUser } from "../../../interfaces/user.interface";
import { ForkJoinService } from "../../../services/fork-join.service";

@Component({
  selector: "app-operators-fork-join",
  templateUrl: "./fork-join.component.html",
  styleUrl: "./fork-join.component.scss"
})
export class ForkJoinComponent {
  users: IUser[] = [];
  posts: IPost[] = [];
  comments: IComment[] = [];
  stopObs$: Subject<void> = new Subject<void>();

  constructor(private _forkJoinSvc: ForkJoinService) {}

  ngOnInit(): void {
    forkJoin([
      this._forkJoinSvc.getUsers(),
      this._forkJoinSvc.getPosts(),
      this._forkJoinSvc.getComments()
    ]).subscribe((res: [IUser[], IPost[], IComment[]]) => {
      this.users = res[0].slice(-5);
      this.posts = res[1].slice(-5);
      this.comments = res[2].slice(-5);
    });
  }

  ngOnDestroy(): void {
    this.stopObs$.next();
    this.stopObs$.complete();
  }
}
