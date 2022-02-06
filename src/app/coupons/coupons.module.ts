import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CouponsRoutingModule } from './coupons-routing.module'
import { CouponsTaigaModule } from './coupons-taiga.module'
import { CouponsComponent } from './coupons/coupons.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CouponListItemComponent } from './coupons/coupon-list-item/coupon-list-item.component'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [CouponsComponent, CouponListItemComponent],
  imports: [CommonModule, CouponsRoutingModule, CouponsTaigaModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class CouponsModule {}
