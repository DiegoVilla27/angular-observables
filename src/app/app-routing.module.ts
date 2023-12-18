import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "types",
    loadChildren: () =>
      import("./pages/types/types.module").then((m) => m.TypesModule)
  },
  {
    path: "operators",
    loadChildren: () =>
      import("./pages/operators/operators.module").then(
        (m) => m.OperatorsModule
      )
  },
  { path: "", redirectTo: "types", pathMatch: "full" },
  { path: "**", redirectTo: "types", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
