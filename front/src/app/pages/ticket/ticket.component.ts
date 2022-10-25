import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../shared/services/ticket.service";
import {UserTicketModel} from "../../shared/models/user-ticket-model";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  tickets!: UserTicketModel[];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.getAllTickets();
  }

  getAllTickets(): void {
    this.ticketService.getAllUserTicket().subscribe((res: UserTicketModel[]) => {
      this.tickets = res;
      console.log(res);
    })
  }

  deleteTicket(id: string): void {
    this.ticketService.deleteTicket(id).subscribe({
      next: () => {
        this.getAllTickets();
      },
      error: () => {

      }
    })
  }
}
