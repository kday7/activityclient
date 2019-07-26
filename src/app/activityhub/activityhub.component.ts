import { Component, OnInit } from '@angular/core';
import { ApplicationSettings } from '../app.settings';

@Component({
  selector: 'app-activityhub',
  templateUrl: './activityhub.component.html',
  styleUrls: ['./activityhub.component.css']
})
export class ActivityhubComponent implements OnInit {

  title = 'Welcome to the Activity Hub';

  constructor(private appSettings: ApplicationSettings) {
    this.appSettings.setTheme();
  }

  ngOnInit() {
  }

}
