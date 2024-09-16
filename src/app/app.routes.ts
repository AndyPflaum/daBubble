import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DevspaceComponent } from './devspace/devspace.component';
import { LoginSectionComponent } from './login-section/login-section.component';
import { CreateAvatarComponent } from './create-avatar/create-avatar.component';
import { MainComponent } from './main/main.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { SoloChatComponent } from './solo-chat/solo-chat.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { TestComponent } from './main/test/test.component';
import { ChatComponent } from './chat/chat.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '', component: LoginComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginSectionComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'create-avatar', component: CreateAvatarComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'new-password', component: NewPasswordComponent }
    ]
  },
 
  // { 
  //   path: '', component: MainComponent, 
  //   children: [
  //     { path: '', component: LoginSectionComponent },
  //     { path: 'sign-up', component: SignUpComponent },
  //     { path: 'create-avatar', component: CreateAvatarComponent },
  //     { path: 'reset-password', component: ResetPasswordComponent },
  //     { path: 'new-password', component: NewPasswordComponent }

  //   ] 
  // },

  { 
    path: 'main', component: MainComponent, 
    children: [
      { path: 'aa', redirectTo: 'group-chat/1S28fQQEdf7LfxdJASzJ', pathMatch: 'full' },  // Redirect to group chat list or default
      
      { path: 'group-chat/:id', component: GroupChatComponent },  // Route with ID parameter
      { path: 'chat/:id', component: SoloChatComponent },  // Route with ID parameter
    ],
  },


];

