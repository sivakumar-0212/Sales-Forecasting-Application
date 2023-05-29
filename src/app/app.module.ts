import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';

import {HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { VisualComponent } from './visual/visual.component';


import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

import {MatToolbarModule} from '@angular/material/toolbar';
import { DashComponent } from './dash/dash.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory(): any {  
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ResultComponent,
    VisualComponent,
    DashComponent,
    SignupComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatToolbarModule,
    MatSnackBarModule,
    LottieModule.forRoot({ player: playerFactory }), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
