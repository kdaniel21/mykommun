import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth'
import { from, Observable } from 'rxjs'

interface MenuItem {
  name: string
  icon: string
  route?: string[]
  action?: () => void
}

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponent {
  private readonly authenticatedMenuItems: MenuItem[] = [
    { name: 'Home', icon: 'tuiIconUser', route: ['/', 'profile'] },
    // { name: 'Leaderboards', icon: 'tuiIconOLLarge', route: ['/', 'leaderboards'] },
    {
      name: 'Report problem',
      icon: 'tuiIconCloseCircleLarge',
      route: ['/', 'submit'],
    },
    { name: 'Coupons', icon: 'tuiIconCardsLarge', route: ['/', 'coupons'] },
    // { name: 'Initiatives', icon: 'tuiIconLikeLarge', action: () => this.onLogout() },
    { name: 'Sign out', icon: 'tuiIconLogoutLarge', action: () => this.onLogout() },
  ]

  private readonly guestMenuItems: MenuItem[] = [
    { name: 'Login', icon: 'tuiIconLoginLarge', route: ['/', 'auth', 'login'] },
  ]

  readonly menuItems$ = this.firebaseAuth.user.pipe(
    map((user) => (!!user ? this.authenticatedMenuItems : this.guestMenuItems)),
  )

  constructor(private readonly router: Router, private readonly firebaseAuth: AngularFireAuth) {}

  onMenuItemClick(translationKey: string) {
    const allMenuItems = [...this.authenticatedMenuItems, ...this.guestMenuItems]
    const menuItem = allMenuItems.find((item) => item.name === translationKey)
    if (!menuItem) return

    if (typeof menuItem.action === 'function') menuItem.action()
  }

  onLogout() {
    const signOutAction$: Observable<void> = from(this.firebaseAuth.signOut())

    signOutAction$.subscribe({ next: () => this.router.navigate(['/']) })
  }
}
