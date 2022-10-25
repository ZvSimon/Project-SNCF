import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../shared/models/user-model";
import {NavigationService} from "../../../shared/services/navigation.service";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../shared/services/user.service";
import {AuthDialogComponent} from "../../../shared/components/auth-dialog/auth-dialog.component";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isLogged = false;
  user!: UserModel | undefined;

  constructor(private navigationService: NavigationService, public dialog: MatDialog, private userService: UserService, sanitizer: DomSanitizer, iconRegistry: MatIconRegistry) {
    iconRegistry.addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg'));
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'));
    iconRegistry.addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram.svg'));
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();

    if (this.user) {
      this.isLogged = true;
    }
    this.checkUserUpdate();
  }

  checkUserUpdate(): void {
    this.userService.getUserSubject().subscribe((res) => {
      if (res) {
        this.user = this.userService.getUser();

        if (this.user) {
          this.isLogged = true;
        }
      } else {
        this.user = undefined;
        this.isLogged = false;
      }
    })
  }

  navigateTo(path: string): void {
    this.navigationService.navigateTo(path);
  }

  navigateToExternalUrl(url: string): void {
    window.open("https://" + url, "_blank");
  }

  openAuthDialog(): void {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '350px',
      data: true,
    });

    // when dialog is closed
    dialogRef.afterClosed().subscribe(() => {
      this.user = this.userService.getUser();

      if (this.user) {
        this.isLogged = true;
      }
    });
  }
}
