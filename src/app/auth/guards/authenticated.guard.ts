import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly authStateService: AngularFireAuth, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.authStateService.user.pipe(
      first(),
      map((user) => !!user),
      map((isAuthenticated) => {
        if (isAuthenticated) return true

        return this.router.createUrlTree(['/', 'auth', 'login'], { queryParams: { returnUrl: route.url } })
      })
    )
  }
}
