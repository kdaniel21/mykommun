import { Component, ChangeDetectionStrategy } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-sidebar-profile',
  templateUrl: './sidebar-profile.component.html',
  styleUrls: ['./sidebar-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarProfileComponent {
  readonly user$ = this.authService.user

  constructor(private authService: AngularFireAuth) {}
}
