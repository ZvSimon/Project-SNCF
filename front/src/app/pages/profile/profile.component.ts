import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {UserModel} from "../../shared/models/user-model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  error = false;
  user: UserModel | undefined;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.user = this.userService.getUser();

    this.form = this.fb.group({
      firstName: this.fb.control(this.user ? this.user.firstName : ''),
      lastName: this.fb.control(this.user ? this.user.lastName : ''),
      mail: this.fb.control(this.user ? this.user.mail : ''),
      password: this.fb.control(''),
    })
  }

  ngOnInit(): void {
  }

  submit(): void {
    const obj: UserModel = this.form.value;

    obj._id = this.user?._id;

    this.userService.updateUser(obj).subscribe(result => {
      this.userService.setCookie('user', JSON.stringify(result.user));
      this.userService.updateUserSubject(true);
    })
  }

}
