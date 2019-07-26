import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationSettings } from '../../app.settings';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent implements OnInit {

  hub = 'MyHub';

  id = -1;
  name: string;
  url: string;
  icon: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appSettings: ApplicationSettings,
              private activitiesService: ActivitiesService) {

  }

  ngOnInit() {
    this.hub = this.appSettings.getActiveHub();

    this.id = this.route.snapshot.data.activity.identifier;
    this.name = this.route.snapshot.data.activity.name;
    this.url = this.route.snapshot.data.activity.url;
    this.icon = this.route.snapshot.data.activity.icon;
  }

  saveActivity(): void {
    this.logActivityDetails('save');

    if (this.id === undefined || this.id === -1) {
      this.activitiesService.createActivity(this.id, this.name, this.url, this.icon);
    } else {
      this.activitiesService.updateActivity(this.id, this.name, this.url, this.icon);
    }

    this.router.navigate([this.hub, 'activities']);   // :hub/activities
  }

  deleteActivity(): void {
    this.logActivityDetails('delete');

    const deleteConfirmed = confirm('Are you sure you want to delete this activity?');
    if (deleteConfirmed) {
      this.activitiesService.deleteActivity(this.id);
      this.router.navigate(['/' + this.hub, '']);
    }
  }

  cancelEdit(): void {
    this.router.navigate([this.hub, 'activities']);   // :hub/activities
  }

  logActivityDetails(method: string): void {
    const activityDetails = 'activity[id=' + this.id +
                      ', name=' + this.name +
                      ', link=' + this.url +
                      ', icon=' + this.icon + ']';
    console.log('activity-details.component: activity details [' + method + '] ' + activityDetails);
  }
}
