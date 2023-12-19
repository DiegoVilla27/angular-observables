import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { subjectImports } from "./subject/subject.imports";
import { TypesComponent } from "./types.component";
import { TypesRoutingModule } from "./types-routing.module";
import { replaySubjectImports } from "./replay-subject/replay-subject.imports";

@NgModule({
  declarations: [TypesComponent, ...subjectImports, ...replaySubjectImports],
  imports: [CommonModule, TypesRoutingModule]
})
export class TypesModule {}
