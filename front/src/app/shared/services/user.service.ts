import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {UserModel, AuthResultModel} from "../models/user-model";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  updateUserSubject(isLoggedIn: boolean) {
    this.userSubject.next(isLoggedIn);
  }

  getUserSubject(): Observable<any> {
    return this.userSubject.asObservable();
  }

  // request backend api for register
  signUp(user: UserModel): Observable<AuthResultModel> {
    return this.http.post<AuthResultModel>(environment.backendApi + environment.user + '/register', user);
  }

  // request backend api for logging
  signIn(user: UserModel): Observable<AuthResultModel> {
    return this.http.post<AuthResultModel>(environment.backendApi + environment.user + '/login', user);
  }

  updateUser(user: UserModel): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
    return this.http.put<any>(environment.backendApi + environment.user + '/' + user._id, user, {headers: headers})
  }

  // set cookie to stay logged when reloading page
  setCookie(label: string, data: string): void {
    this.cookieService.set(label, data);
  }

  // get cookie to stay logged when reloading page
  getCookie(label: string): string {
    return this.cookieService.get(label);
  }

  getUser(): UserModel | undefined {
    if (this.cookieService.get('user')) {
      return JSON.parse(this.cookieService.get('user'));
    }
    return undefined;
  }

  getToken(): string | undefined {
    return this.cookieService.get('token');
  }

  // delete cookie to logout user
  logout(): void {
    this.cookieService.deleteAll();
    this.updateUserSubject(false);
  }
}
