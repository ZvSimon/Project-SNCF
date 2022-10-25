import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../../shared/services/navigation.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthDialogComponent} from "../../../shared/components/auth-dialog/auth-dialog.component";
import {UserService} from "../../../shared/services/user.service";
import {UserModel} from "../../../shared/models/user-model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged = false;
  user!: UserModel | undefined;

  constructor(private navigationService: NavigationService, public dialog: MatDialog, private userService: UserService) {
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
      }
    })
  }

  // delete cookie and set all variable to null/false (not logged)
  logout(): void {
    this.userService.logout();
    this.user = undefined;
    this.isLogged = false;
  }

  // changing page
  navigateTo(path: string): void {
    this.navigationService.navigateTo(path);
  }

  // open dialog (popup) for signin and signup
  openAuthDialog(isSignIn: boolean): void {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '350px',
      data: isSignIn,
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
