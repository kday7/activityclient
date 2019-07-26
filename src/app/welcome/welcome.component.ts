import { Component, OnInit } from '@angular/core';
import { ApplicationSettings } from '../app.settings';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  title = 'Welcome to the Activity Hub';

  constructor(private appSettings: ApplicationSettings) {
    this.appSettings.setTheme();
   }

  ngOnInit() {
  }

}
