import { Component, OnInit } from '@angular/core';
import { ApplicationSettings } from 'src/app/app.settings';
import { Property } from './property';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  hub: string;
  properties: Property[];
  serverUrl: string = environment.apiUrl;

  constructor(private route: ActivatedRoute,
              private appSettings: ApplicationSettings,
              private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.hub = this.appSettings.getActiveHub();
    this.properties = this.route.snapshot.data.properties;
  }

  public shutDownServer(): void {
    this.propertiesService.shutDownServer();
  }

}
