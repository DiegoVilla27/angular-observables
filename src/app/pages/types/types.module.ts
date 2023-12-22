import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { behaviorSubjectImports } from "./behavior-subject/behavior-subject.imports";
import { replaySubjectImports } from "./replay-subject/replay-subject.imports";
import { subjectImports } from "./subject/subject.imports";
import { TypesRoutingModule } from "./types-routing.module";
import { TypesComponent } from "./types.component";

@NgModule({
  declarations: [
    TypesComponent,
    ...subjectImports,
    ...replaySubjectImports,
    ...behaviorSubjectImports
  ],
  imports: [CommonModule, TypesRoutingModule]
})
export class TypesModule {}
