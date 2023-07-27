import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { LocationComponent } from './components/location/location.component';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { FormsModule } from '@angular/forms';

import { SupabaseService } from 'src/service/supabase.service'; // Import the service
import { LoginComponent } from './components/login/login.component'

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent }, // Add a route for the LoginComponent
  { path: 'form', component: FormComponent },   // Add a route for the FormComponent
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirect to the login page if no path is specified
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LocationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
    //AppRoutingModule
  ],
  providers: [
    Geolocation,
    SupabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
