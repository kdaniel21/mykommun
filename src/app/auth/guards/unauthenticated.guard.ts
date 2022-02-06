import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class UnauthenticatedGuard implements CanActivate {
  constructor(private readonly authService: AngularFireAuth, private readonly router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      first(),
      map((user) => !!user),
      map((isAuthenticated) => {
        console.log(isAuthenticated)
        if (!isAuthenticated) return true

        return this.router.createUrlTree(['/'])
      })
    )
  }
}
