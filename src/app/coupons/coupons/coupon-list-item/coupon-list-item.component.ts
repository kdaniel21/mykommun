import { Component, Input } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { BehaviorSubject, from, Observable } from 'rxjs'
import { first, switchMap, tap } from 'rxjs/operators'
import { NotificationsService } from 'src/app/core/services/notifications.service'
import { CouponType } from '../coupon-type.enum'

export interface CouponListItem {
  couponType: CouponType
  name: string
  website: string
}

@Component({
  selector: 'app-coupon-list-item',
  templateUrl: './coupon-list-item.component.html',
  styleUrls: ['./coupon-list-item.component.scss'],
})
export class CouponListItemComponent {
  @Input() readonly coupon: CouponListItem

  readonly price = this.generateRandomNumberInRange(100, 200)
  readonly discountPercentage: number = this.generateRandomNumberInRange(20, 50) / 100

  private readonly hasPurchasedSubject = new BehaviorSubject<boolean>(false)
  readonly hasPurchased$: Observable<boolean> = this.hasPurchasedSubject.asObservable()

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly firebaseAuth: AngularFireAuth,
    private readonly notificationService: NotificationsService,
  ) {}

  private generateRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  onBuyCoupon(): void {
    const buyCouponAction$: Observable<void> = this.firebaseAuth.user.pipe(
      first(),
      switchMap((user) => from(this.firestore.collection('points').ref.where('userId', '==', user.uid).limit(1).get())),
      switchMap((querySnapshot) => {
        const userPointsDocument: any = { ...(querySnapshot.docs[0].data() as {}), id: querySnapshot.docs[0].id }

        const afterTransactionPointsCount = userPointsDocument.pointsCount - this.price

        const hasSufficientFunds = afterTransactionPointsCount > 0
        if (!hasSufficientFunds) {
          throw new Error()
        }

        return this.firestore
          .doc('points/' + userPointsDocument.id)
          .update({ pointsCount: afterTransactionPointsCount })
      }),
      tap(() => this.notificationService.showSuccess(`You have successfully purchased ${this.coupon.name}`!)),
      tap(() => this.hasPurchasedSubject.next(true)),
      tap({
        error: () =>
          this.notificationService.showError(`You don't have the sufficient funds to purchase ${this.coupon.name}`),
      }),
    )

    buyCouponAction$.subscribe()
  }
}
