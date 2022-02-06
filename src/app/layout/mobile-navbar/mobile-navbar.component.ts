import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MobileNavbarService } from './mobile-navbar.service'

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavbarComponent {
  isSidebarOpen$ = this.mobileNavbarService.isSidebarOpen$

  constructor(private readonly mobileNavbarService: MobileNavbarService) {}

  toggleSidebar(): void {
    this.mobileNavbarService.toggleSidebar()
  }
}
