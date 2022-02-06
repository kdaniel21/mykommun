import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'
import { switchMap, map, startWith } from 'rxjs/operators'
import { CouponListItem } from './coupon-list-item/coupon-list-item.component'
import { CouponType } from './coupon-type.enum'
import { HttpClient } from '@angular/common/http'

interface CouponTypeItem {
  name: string
  value: CouponType
  apiUrl: string
}

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
})
export class CouponsComponent {
  readonly couponTypeItems: CouponTypeItem[] = [
    {
      name: 'Sport facilities',
      value: CouponType.SportFacilities,
      apiUrl: 'https://catalog.sodertalje.se/rowstore/dataset/1e7197b0-93d6-49ea-878f-489eff759ba7/json',
    },
    {
      name: 'Hotels',
      value: CouponType.Hotels,
      apiUrl: 'https://catalog.sodertalje.se/rowstore/dataset/3ef1e5df-9e40-4682-8054-cca1c218ea69/json',
    },
  ]
  readonly selectedCouponTypeControl = this.formBuilder.control(this.couponTypeItems[0])

  readonly pointsCount$: Observable<number> = this.firebaseAuth.user.pipe(
    switchMap((user) =>
      this.firestore.collection('points', (ref) => ref.where('userId', '==', user.uid).limit(1)).valueChanges(),
    ),
    map((documents) => documents[0]),
    map((document: any) => document.pointsCount as number),
  )

  readonly couponListItems$: Observable<CouponListItem[]> = this.selectedCouponTypeControl.valueChanges.pipe(
    startWith(''),
    map(() => this.selectedCouponTypeControl.value),
    switchMap((couponType: CouponTypeItem) => this.http.get(couponType.apiUrl)),
    map((response: any) =>
      response.results.map(
        (result: any) =>
          ({
            name: result['\ufeffnamn'],
            website: result.webbsida,
            couponType: this.selectedCouponTypeControl.value.value,
          } as any as CouponListItem),
      ),
    ),
  )

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly firebaseAuth: AngularFireAuth,
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient,
  ) {}
}
