import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'

@Component({
  selector: 'app-points-status-indicator',
  templateUrl: './points-status-indicator.component.html',
  styleUrls: ['./points-status-indicator.component.scss'],
})
export class PointsStatusIndicatorComponent {
  readonly user$ = this.firebaseAuth.user

  readonly pointsCount$: Observable<number> = this.user$.pipe(
    switchMap((user) =>
      this.firestore.collection('points', (ref) => ref.where('userId', '==', user.uid).limit(1)).valueChanges(),
    ),
    map((documents) => documents[0]),
    map((document: any) => document.pointsCount as number),
  )

  constructor(private readonly firestore: AngularFirestore, private readonly firebaseAuth: AngularFireAuth) {}
}
