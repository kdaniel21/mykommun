import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SubmitComponent } from './submit/submit.component'

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: SubmitComponent }])],
  exports: [RouterModule],
})
export class SubmitRoutingModule {}
