import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class MobileNavbarService {
  private readonly isSidebarOpenSubject = new BehaviorSubject<boolean>(false)
  readonly isSidebarOpen$ = this.isSidebarOpenSubject.asObservable()

  toggleSidebar(): void {
    const currentState = this.isSidebarOpenSubject.getValue()
    this.isSidebarOpenSubject.next(!currentState)
  }
}
