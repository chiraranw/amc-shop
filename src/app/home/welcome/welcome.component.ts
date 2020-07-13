import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'amc-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  pageTitle: string = 'Welcome...';
  constructor() {
    console.log('Welcome.....');
  }

  ngOnInit(): void {}
}
