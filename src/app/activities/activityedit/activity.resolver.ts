import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ActivitiesService } from '../activities.service';


@Injectable()
export class ActivityResolver implements Resolve<any> {

  activity: any;

  constructor(public activitiesService: ActivitiesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    console.log('ActivityResolver: Activity name: ' + route.params.activity );

    this.getActivity(+route.params.activity);
    console.log('ActivityResolver: resolve finished');
    return this.activity;
  }

  getActivity(activityId: number) {
      this.activity = undefined;
      console.log('ActivityResolver: Fetching ' + activityId);

      if (activityId === -1) {
        this.activity = {'identifier': -1, 'name': '', 'url': ''};
      } else {
        this.activity = this.activitiesService.getActivity(activityId);
      }
      console.log('ActivityResolver: Call to getActivity has finished');
  }
}
