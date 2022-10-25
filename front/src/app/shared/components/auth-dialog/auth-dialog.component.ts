import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {AuthModel} from "../../models/auth-model";
import {UserModel} from "../../models/user-model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  form!: FormGroup;
  error = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private dialogRef: MatDialogRef<AuthDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public isSignIn: boolean) {
    this.createdForm();
    console.log(this.form);
  }

  ngOnInit(): void {
  }

  // creating form for signin or signup
  createdForm(): void {
    let obj: AuthModel;

    // when loggin
    if (this.isSignIn) {
      obj = {
        mail: this.fb.control('', Validators.required),
        password: this.fb.control('', Validators.required),
      }
      // when register
    } else {
      obj = {
        firstName: this.fb.control('', Validators.required),
        lastName: this.fb.control('', Validators.required),
        mail: this.fb.control('', Validators.required),
        password: this.fb.control('', Validators.required),
        confirmPassword: this.fb.control('', Validators.required),
      }
    }
    this.form = this.fb.group(obj);
  }

  // update for when clicking on button to swap register to login or login to register
  updateFormField(): void {
    this.isSignIn = !this.isSignIn;

    this.form.reset();

    if (this.isSignIn) {
      if (this.form.controls['firstName']) {
        this.form.removeControl('firstName')
      }
      if (this.form.controls['lastName']) {
        this.form.removeControl('lastName')
      }
      if (this.form.controls['confirmPassword']) {
        this.form.removeControl('confirmPassword')
      }
    } else {
      if (!this.form.controls['firstName']) {
        this.form.addControl('firstName', this.fb.control('', Validators.required))
      }
      if (!this.form.controls['lastName']) {
        this.form.addControl('lastName', this.fb.control('', Validators.required))
      }
      if (!this.form.controls['confirmPassword']) {
        this.form.addControl('confirmPassword', this.fb.control('', Validators.required))
      }
    }
  }

  // close dialog
  close(): void {
    this.dialogRef.close();
  }

  // validate form and request backend api
  submit(): void {
    // creating user obj
    const user: UserModel = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      password: this.form.value.password,
      mail: this.form.value.mail,
    }
    if (this.isSignIn) {
      this.login(user);
    } else {
      this.register(user);
    }
  }

  // request register backend api
  register(user: UserModel): void {
    this.userService.signUp(user).subscribe({
      next: (result) => {
        if (result) {
          // user created, logged / setup cookie
          this.userService.setCookie('user', JSON.stringify(result.user));
          this.userService.setCookie('token', result.token);
          this.userService.updateUserSubject(true);
          this.close();
        }
      },
      error: (error: unknown) => {
        console.log(error);
        this.error = true;
      }
    })
  }

  login(user: UserModel): void {
    this.userService.signIn(user).subscribe({
      next: (result) => {
        if (result) {
          // user logged / setup cookie
          this.userService.setCookie('user', JSON.stringify(result.user));
          this.userService.setCookie('token', result.token);
          this.userService.updateUserSubject(true);
          this.close();
        }
      },
      error: (error: unknown) => {
        console.log(error);
        this.error = true;
      }
    })
  }
}
