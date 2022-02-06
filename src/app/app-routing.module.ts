import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthenticatedGuard } from './auth/guards/authenticated.guard'
import { UnauthenticatedGuard } from './auth/guards/unauthenticated.guard'
import { LayoutComponent } from './layout/layout.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [AuthenticatedGuard],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
        canActivate: [UnauthenticatedGuard],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'coupons',
        loadChildren: () => import('./coupons/coupons.module').then((m) => m.CouponsModule),
        canActivate: [AuthenticatedGuard],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'leaderboards',
        loadChildren: () => import('./leaderboards/leaderboards.module').then((m) => m.LeaderboardsModule),
        canActivate: [AuthenticatedGuard],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'submit',
        loadChildren: () => import('./submit/submit.module').then((m) => m.SubmitModule),
        canActivate: [AuthenticatedGuard],
        runGuardsAndResolvers: 'always',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
