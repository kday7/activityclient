import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ActivitiesService } from '../activities.service';
import { Observable } from 'rxjs';

@Injectable()
export class ActivitiesResolver implements Resolve<any> {

  constructor(public activitiesService: ActivitiesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('ActivitiesResolver: Resolving activities...');
    return this.activitiesService.getActivities();
  }
}
