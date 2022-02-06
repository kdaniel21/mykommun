import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LeaderboardsComponent } from './leaderboards/leaderboards.component'
import { LeaderboardsRoutingModule } from './leaderboards-routing.module'
import { LeaderboardsTaigaModule } from './leaderboards-taiga.module'

@NgModule({
  declarations: [LeaderboardsComponent],
  imports: [CommonModule, LeaderboardsRoutingModule, LeaderboardsTaigaModule],
})
export class LeaderboardsModule {}
