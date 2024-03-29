import { Component } from "@angular/core";
import { Subject, switchMap, takeUntil, tap } from "rxjs";
import { IComment } from "../../../interfaces/comment.interface";
import { IPost } from "../../../interfaces/post.interface";
import { SwitchMapService } from "../../../services/switch-map.service";

@Component({
  selector: "app-operators-switch-map",
  templateUrl: "./switch-map.component.html",
  styleUrl: "./switch-map.component.scss"
})
export class SwitchMapComponent {
  post: IPost = { id: 0, body: "", title: "" };
  comments: IComment[] = [];
  stopObs$: Subject<void> = new Subject<void>();

  constructor(private _switchMapSvc: SwitchMapService) {}

  ngOnInit(): void {
    this._switchMapSvc
      .getPosts()
      .pipe(
        takeUntil(this.stopObs$),
        tap((post: IPost) => (this.post = post)),
        switchMap((res: IPost) => {
          return this._switchMapSvc.getComments(res.id.toString());
        })
      )
      .subscribe((comments: IComment[]) => (this.comments = comments));
  }

  ngOnDestroy(): void {
    this.stopObs$.next();
    this.stopObs$.complete();
  }
}
