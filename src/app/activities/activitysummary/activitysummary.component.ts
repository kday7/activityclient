import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationSettings } from '../../app.settings';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activitysummary',
  templateUrl: './activitysummary.component.html',
  styleUrls: ['./activitysummary.component.css']
})
export class ActivitysummaryComponent implements OnInit {

  hub: string;
  activities: any[] = [];

  constructor(private route: ActivatedRoute,
              private appSettings: ApplicationSettings,
              private activitiesService: ActivitiesService) { }

  ngOnInit() {
    console.log('Activity Summary: Initialising');
    this.hub = this.appSettings.getActiveHub();
    this.activities = this.route.snapshot.data['activities'];
    console.log('Activity Summary: Activity count: ' + this.activities.length);
    // this.activities = this.route.snapshot.data.activities;
  }

  openActivitiesFile(): void {
    this.activitiesService.openActivitiesFile();
  }

}
