import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SubmitComponent } from './submit/submit.component'
import { SubmitRoutingModule } from './submit-routing.module'
import { SubmitTaigaModule } from './submit-taiga.module'
import { ReactiveFormsModule } from '@angular/forms';
import { SingleImageUploadComponent } from './submit/single-image-upload/single-image-upload.component'

@NgModule({
  declarations: [SubmitComponent, SingleImageUploadComponent],
  imports: [CommonModule, SubmitRoutingModule, SubmitTaigaModule, ReactiveFormsModule],
})
export class SubmitModule {}
