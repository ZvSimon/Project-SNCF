import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {PlaceModel} from "../models/place-model";
import {environment} from "../../../environments/environment";
import {UserService} from "./user.service";
import {UserTicketModel} from "../models/user-ticket-model";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  // get place from sncf api and format data
  getPlace(place: string): Observable<PlaceModel[]> {
    return this.http.get(`${environment.sncfApi}/coverage/sncf/places?q=${place}&key=${environment.token}`).pipe(map((val: any) => {
      if (val.places) {
        const result: PlaceModel[] = [];
        val.places.forEach((element: any) => {
          if (element.administrative_region) {
            result.push(element.administrative_region)
          } else if (element.stop_area) {
            result.push(element.stop_area)
          }
        });
        return result;
      }
      return [];
    }));
  }

  // get journeys from sncf api
  getTickets(fromPlace: PlaceModel, toPlace: PlaceModel, date: Date): Observable<any> {
    return this.http.get(`${environment.sncfApi}/coverage/sncf/journeys?from=${fromPlace.id}&to=${toPlace.id}&datetime=${date.toLocaleString()}&key=${environment.token}`)
  }

  addTicket(from: string, to: string, data: any, userId: string | undefined): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userService.getToken()}`
    })
    return this.http.post<void>(environment.backendApi + environment.ticket, {
      from,
      to,
      data: JSON.stringify(data),
      user: userId
    }, {headers: headers});
  }

  deleteTicket(_id: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userService.getToken()}`
    })
    return this.http.delete<void>(environment.backendApi + environment.ticket + '/' + _id, {headers: headers});
  }

  getAllUserTicket(): Observable<UserTicketModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userService.getToken()}`
    })
    return this.http.get<UserTicketModel[]>(environment.backendApi + environment.ticket, {headers: headers}).pipe(map((val: any) => {
      let result: UserTicketModel[] = [];

      val.tickets.forEach((el: any) => {
        result.push({
          _id: el._id,
          user: el.user,
          to: el.to,
          from: el.from,
          data: JSON.parse(el.data)
        })
      })
      return result;
    }));
  }
}
