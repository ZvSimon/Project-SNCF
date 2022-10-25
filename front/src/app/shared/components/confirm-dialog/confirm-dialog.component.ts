import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {AuthModel} from "../../models/auth-model";
import {UserModel} from "../../models/user-model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  form!: FormGroup;
  error = false;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public isSignIn: boolean) {
  }

  ngOnInit(): void {
  }

  close(isConfirmed: boolean): void {
    this.dialogRef.close(isConfirmed);
  }
}
