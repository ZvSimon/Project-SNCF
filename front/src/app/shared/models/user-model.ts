// custom model for User
export interface UserModel {
  _id?: string;
  firstName: string;
  lastName: string;
  password: string;
  mail: string;
  levelOfAccess?: number;
}

// custom model for auth result by api
export interface AuthResultModel {
  user: UserModel;
  token: string;
}
