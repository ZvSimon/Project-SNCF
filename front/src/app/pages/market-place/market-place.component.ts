import { Component, OnInit } from '@angular/core';
import {NavigationService} from "../../shared/services/navigation.service";
import {TicketService} from "../../shared/services/ticket.service";
import {UserService} from "../../shared/services/user.service";
import {UserTicketModel} from "../../shared/models/user-ticket-model";
import {MatDialog} from "@angular/material/dialog";
import {AuthDialogComponent} from "../../shared/components/auth-dialog/auth-dialog.component";
import {ConfirmDialogComponent} from "../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketPlaceComponent implements OnInit {

  data: any;
  error = false;
  isTicketAdded = false;

  constructor(private navigationService: NavigationService, private ticketService: TicketService, private userService: UserService, private dialog: MatDialog) {
    // get data from redirection (journey details)
    if (!this.navigationService.getExtraData()) {
      this.navigationService.navigateTo('');
    }
    this.data = JSON.parse(this.navigationService.getExtraData());
    this.getAllTickets();
  }

  ngOnInit(): void {

  }

  getAllTickets(): void {
    this.ticketService.getAllUserTicket().subscribe((res: UserTicketModel[]) => {
      console.log(res);
    })
  }

  buyTicket(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
    });

    // when dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addTicket();
      }
    });
  }

  addTicket(): void {
    const from = this.data.sections[0].from.name;
    const to = this.data.sections[this.data.sections.length - 1].from.name;
    const userId = this.userService.getUser()?._id;

    this.ticketService.addTicket(from, to, this.data, userId).subscribe({
      next: () => {
        this.isTicketAdded = true;
      },
      error: () => {
        this.error = true;
      }
    })
  }
}
