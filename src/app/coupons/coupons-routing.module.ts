import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CouponsComponent } from './coupons/coupons.component'

const routes: Routes = [{ path: '', pathMatch: 'full', component: CouponsComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponsRoutingModule {}
