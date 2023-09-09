import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { BoardsComponent } from './components/boards/boards.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PetProfileComponent } from './components/pet-profile/pet-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {path: "register", component: RegisterComponent},
  {path: "about", component: AboutComponent},
  {path: "boards", component: BoardsComponent},
  {path: "reports", component: ReportsComponent},
  {path: "my-profile", component: MyProfileComponent},
  {path: "pet-profile", component: PetProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
