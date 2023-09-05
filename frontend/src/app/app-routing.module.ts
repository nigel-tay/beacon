import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { BoardsComponent } from './components/boards/boards.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PetProfileComponent } from './components/pet-profile/pet-profile.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "about", component: AboutComponent},
  {path: "boards", component: BoardsComponent},
  {path: "reports", component: ReportsComponent},
  {path: "my-profile", component: MyProfileComponent},
  {path: "pet-profile", component: PetProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
