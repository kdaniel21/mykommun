import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LeaderboardsComponent } from './leaderboards/leaderboards.component'

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: LeaderboardsComponent }])],
  exports: [RouterModule],
})
export class LeaderboardsRoutingModule {}
