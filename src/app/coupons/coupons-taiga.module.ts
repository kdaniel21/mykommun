import { NgModule } from '@angular/core'
import { TuiButtonModule, TuiDataListModule, TuiSvgModule } from '@taiga-ui/core'
import { TuiDataListWrapperModule, TuiIslandModule, TuiSelectModule } from '@taiga-ui/kit'

const taigaModules = [
  TuiButtonModule,
  TuiSelectModule,
  TuiDataListWrapperModule,
  TuiDataListModule,
  TuiIslandModule,
  TuiSvgModule,
]

@NgModule({
  imports: [...taigaModules],
  exports: [...taigaModules],
})
export class CouponsTaigaModule {}
