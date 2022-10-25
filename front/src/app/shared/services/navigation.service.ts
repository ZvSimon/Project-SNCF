import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  // navigate to another page
  navigateTo(path: string, data?: string): void {
    this.router.navigate([path], {state: {data}});
  }

  // get data from another page
  getExtraData(): string {
    if (this.router.getCurrentNavigation()?.extras.state) {
      return this.router.getCurrentNavigation()?.extras?.state?.['data'];
    }
    return '';
  }
}
