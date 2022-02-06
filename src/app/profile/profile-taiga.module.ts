import { NgModule } from '@angular/core'
import { TuiButtonModule } from '@taiga-ui/core'

const taigaModules = [TuiButtonModule]

@NgModule({
  imports: [...taigaModules],
  exports: [...taigaModules],
})
export class ProfileTaigaModule {}
