import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {TicketService} from "../../shared/services/ticket.service";
import {PlaceModel} from "../../shared/models/place-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  fromSearchOption!: PlaceModel[];
  fromSelected!: PlaceModel;
  toSearchOption!: PlaceModel[];
  toSelected!: PlaceModel;
  minDate = new Date();

  journeys: any;

  constructor(private fb: FormBuilder, private ticketService: TicketService) {
    // form to get data typed by user
    this.form = this.fb.group({
      from: this.fb.control('', Validators.required),
      to: this.fb.control('', Validators.required),
      departure: this.fb.control(this.minDate, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  // format data for autocompletion
  displayFn(place: PlaceModel): string {
    return place && place.label ? place.label : '';
  }

  // add selected place to variable
  selectPlace(place: PlaceModel, isFrom: boolean): void {
    if (isFrom) {
      this.fromSelected = place;
    } else {
      this.toSelected = place;
    }
  }

  // request sncf api to search journeys
  searchTickets(): void {
    const date = new Date(this.form.value.departure)
    if (this.fromSelected && this.toSelected && !isNaN(date.getTime())) {
      this.ticketService.getTickets(this.fromSelected, this.toSelected, date).subscribe(res => {
        console.log(res)
        this.journeys = res.journeys;
      })
    }
  }

  // request sncf api to search places
  searchPlace(isFrom: boolean): void {
    // check value for from
    if (isFrom && !this.form.value.from) {
      this.fromSearchOption = [];
      return;

      // check value for to
    } else if (!isFrom && !this.form.value.to) {
      this.toSearchOption = [];
      return;
    }

    // api request
    this.ticketService.getPlace(isFrom ? this.form.value.from : this.form.value.to).subscribe((result) => {
      if (isFrom) {
        this.fromSearchOption = result;
      } else {
        this.toSearchOption = result;
      }
    });
  }
}
