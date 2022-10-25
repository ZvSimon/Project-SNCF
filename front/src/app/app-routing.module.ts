import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {MarketPlaceComponent} from "./pages/market-place/market-place.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {TicketComponent} from "./pages/ticket/ticket.component";
import {AboutComponent} from "./pages/about/about.component";

// route for application path = component
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'marketplace', component: MarketPlaceComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'ticket', component: TicketComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
