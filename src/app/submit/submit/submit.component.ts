import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { first, switchMap, tap } from 'rxjs/operators'
import { NotificationsService } from 'src/app/core/services/notifications.service'

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class SubmitComponent {
  activeItemIndex: number = 0

  readonly submitForm = this.formBuilder.group({
    subject: this.formBuilder.control(null, [Validators.required]),
    description: this.formBuilder.control(null, [Validators.required]),
    imageUrl: this.formBuilder.control(null),
  })

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly firestore: AngularFirestore,
    private readonly firebaseAuth: AngularFireAuth,
    private readonly notificationService: NotificationsService,
    private readonly router: Router,
  ) {}

  onNextStep(): void {
    this.activeItemIndex++
  }

  onImageUpload(downloadUrl: string): void {
    this.submitForm.patchValue({ imageUrl: downloadUrl })
  }

  onSubmit(): void {
    const { subject, description, imageUrl } = this.submitForm.value

    this.firebaseAuth.user
      .pipe(
        first(),
        switchMap((user) =>
          this.firestore.collection('complaints').add({ userId: user.uid, subject, description, imageUrl }),
        ),
        tap(() => this.notificationService.showSuccess('Your complaint has been successfully filed!')),
        tap(() => this.router.navigate(['/'])),
      )
      .subscribe()
  }
}
