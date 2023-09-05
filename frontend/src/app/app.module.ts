import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import { BoardsComponent } from './components/boards/boards.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PetProfileComponent } from './components/pet-profile/pet-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AboutComponent,
    BoardsComponent,
    ReportsComponent,
    MyProfileComponent,
    PetProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
