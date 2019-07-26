import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationSettings } from '../../app.settings';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activitylist',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit, DoCheck {

    hub: string;
    activities: any = [];

    constructor(private route: ActivatedRoute,
                private appSettings: ApplicationSettings,
                private activitiesService: ActivitiesService) { }

    ngOnInit() {
        console.log('ActivityListComponent: Initialising...');
        this.hub = this.appSettings.getActiveHub();
        // this.activities = this.route.snapshot.data.activities;
    }

    ngDoCheck() {
        this.activities = this.route.snapshot.data.activities;
    }

    openActivitiesFile(): void {
        this.activitiesService.openActivitiesFile();
    }

}
