import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { MarketPlaceComponent } from './pages/market-place/market-place.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ProfileComponent } from './pages/profile/profile.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AuthDialogComponent } from './shared/components/auth-dialog/auth-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { JourneyCardComponent } from './shared/components/journey-card/journey-card.component';
import {CommonModule} from "@angular/common";
import { SecondFormatPipe } from './shared/pipes/second-format.pipe';
import { FooterComponent } from './core/components/footer/footer.component';
import {CookieService} from "ngx-cookie-service";
import { TicketComponent } from './pages/ticket/ticket.component';
import {ConfirmDialogComponent} from "./shared/components/confirm-dialog/confirm-dialog.component";
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MarketPlaceComponent,
    NavbarComponent,
    ProfileComponent,
    AuthDialogComponent,
    ConfirmDialogComponent,
    JourneyCardComponent,
    SecondFormatPipe,
    FooterComponent,
    TicketComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [
    MatDatepickerModule,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
