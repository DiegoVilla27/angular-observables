import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { subjectImports } from "./subject/subject.imports";
import { TypesComponent } from "./types.component";
import { TypesRoutingModule } from "./types-routing.module";

@NgModule({
  declarations: [TypesComponent, ...subjectImports],
  imports: [CommonModule, TypesRoutingModule]
})
export class TypesModule {}
