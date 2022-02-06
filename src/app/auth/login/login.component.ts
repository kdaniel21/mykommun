import { Component, ChangeDetectionStrategy } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject, from } from 'rxjs'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm = this.formBuilder.group({
    email: ['jury@sodertalje.se', Validators.required],
    password: ['test1234', Validators.required],
  })

  private readonly isLoadingSubject = new BehaviorSubject(false)
  readonly isLoading$ = this.isLoadingSubject.asObservable()

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly authService: AngularFireAuth,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  async onLogin() {
    this.isLoadingSubject.next(true)

    const { email, password } = this.loginForm.value

    const signInAction$ = from(this.authService.signInWithEmailAndPassword(email, password))

    signInAction$.pipe(finalize(() => this.isLoadingSubject.next(false))).subscribe({
      next: async () => {
        const { returnUrl } = this.route.snapshot.queryParams
        this.router.navigateByUrl(returnUrl || '/')
      },
    })
  }
}
