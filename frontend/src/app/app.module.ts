import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule } from '@angular/google-maps';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { viewwidthReducer } from './state/viewwidth/viewwidth.reducer';
import { mobilenavReducer } from './state/mobilenav/mobilenav.reducer';
import { navLoginEnable } from './state/navloginenable/navloginenable.reducer';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterPetComponent } from './components/register-pet/register-pet.component';
import { SightingComponent } from './components/sighting/sighting.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AboutComponent,
    BoardsComponent,
    ReportsComponent,
    MyProfileComponent,
    PetProfileComponent,
    RegisterComponent,
    LogoutComponent,
    RegisterPetComponent,
    SightingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    GoogleMapsModule,
    StoreModule.forRoot({
      viewWidth: viewwidthReducer,
      mobileNav: mobilenavReducer,
      navLoginEnable: navLoginEnable

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
