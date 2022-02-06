import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  readonly user$ = this.authService.user

  constructor(private readonly authService: AngularFireAuth) {}
}
