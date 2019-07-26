import { Component, OnInit } from '@angular/core';
import { ApplicationSettings } from '../app.settings';

@Component({
  selector: 'app-infohub',
  templateUrl: './infohub.component.html',
  styleUrls: ['./infohub.component.css']
})
export class InfohubComponent implements OnInit {

  title = 'Welcome to the Info Hub';

  constructor(private appSettings: ApplicationSettings) {
    this.appSettings.setTheme();
  }

  ngOnInit() {
  }

}
