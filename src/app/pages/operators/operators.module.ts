import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ForkJoinComponent } from "./fork-join/fork-join.component";
import { SwitchMapComponent } from "./switch-map/switch-map.component";
import { OperatorsRoutingModule } from "./operators-routing.module";
import { OperatorsComponent } from "./operators.component";

@NgModule({
  declarations: [OperatorsComponent, ForkJoinComponent, SwitchMapComponent],
  imports: [CommonModule, OperatorsRoutingModule]
})
export class OperatorsModule {}
