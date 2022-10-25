import {FormControl} from "@angular/forms";

// custom model for authentification
export interface AuthModel {
  firstName?: string | FormControl;
  lastName?: string | FormControl;
  mail: string | FormControl;
  password: string | FormControl;
  confirmPassword?: string | FormControl;
}
