import { NgModule } from '@angular/core'
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core'
import { TuiInputFileModule, TuiInputModule, TuiStepperModule, TuiTextAreaModule } from '@taiga-ui/kit'

const taigaModules = [
  TuiStepperModule,
  TuiInputModule,
  TuiTextfieldControllerModule,
  TuiTextAreaModule,
  TuiButtonModule,
  TuiInputFileModule,
]

@NgModule({
  imports: [...taigaModules],
  exports: [...taigaModules],
})
export class SubmitTaigaModule {}
