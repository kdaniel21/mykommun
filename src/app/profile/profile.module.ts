import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfileComponent } from './profile/profile.component'
import { ProfileRoutingModule } from './profile-routing.module'
import { PointsStatusIndicatorComponent } from './points-status-indicator/points-status-indicator.component'
import { ProfileTaigaModule } from './profile-taiga.module'

@NgModule({
  declarations: [ProfileComponent, PointsStatusIndicatorComponent],
  imports: [CommonModule, ProfileRoutingModule, ProfileTaigaModule],
})
export class ProfileModule {}
