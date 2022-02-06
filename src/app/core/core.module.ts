import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PromptModule } from './prompt/prompt.module'
import { AngularFireAuthModule } from '@angular/fire/auth'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [PromptModule, AngularFireAuthModule],
})
export class CoreModule {}
