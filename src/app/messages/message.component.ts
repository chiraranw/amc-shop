import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

@Component({
  selector: 'amc-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  get messages(): string[] {
    return this.messageService.messages;
  }

  constructor(private messageService: MessageService, private router: Router) {}
  ngOnInit(): void {}

  close(): void {
    // Close the popup.
  }
}
