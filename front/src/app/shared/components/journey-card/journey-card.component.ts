import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-journey-card',
  templateUrl: './journey-card.component.html',
  styleUrls: ['./journey-card.component.scss']
})
export class JourneyCardComponent implements OnInit {

  // received data from another component
  @Input() journeys: any;
  @Input() from?: string;
  @Input() to?: string;
  @Input() ticketId?: string;
  @Output() remove = new EventEmitter<string>();

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    console.log(this.journeys);
  }

  // navigate to other page (marketplace)
  navigateTo(): void {
    this.navigationService.navigateTo('/marketplace', JSON.stringify(this.journeys));
  }

  emitDeleteTicket(): void {
    this.remove.emit(this.ticketId);
  }

}
