import { Component, OnInit } from '@angular/core';
import { ApplicationSettings } from '../app.settings';

@Component({
  selector: 'app-taskhub',
  templateUrl: './taskhub.component.html',
  styleUrls: ['./taskhub.component.css']
})
export class TaskhubComponent implements OnInit {

  title = 'Welcome to the Task Hub';

  constructor(private appSettings: ApplicationSettings) {
    this.appSettings.setTheme();
   }

  ngOnInit() {
  }

}
