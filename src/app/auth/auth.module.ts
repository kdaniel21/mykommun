import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { AuthRoutingModule } from './auth-routing.module'
import { AuthTaigaModule } from './auth-taiga.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, AuthTaigaModule, ReactiveFormsModule],
})
export class AuthModule {}
