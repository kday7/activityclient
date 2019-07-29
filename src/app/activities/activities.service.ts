import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ApplicationSettings } from '../app.settings';
import { environment } from 'src/environments/environment';
import { Activity } from './activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

    endpoint = environment.apiUrl + this.appSettings.getActiveHub() + '/';

    constructor(private http: HttpClient,
                private appSettings: ApplicationSettings) { }

    private extractData(data: any) {
      console.log('===> Activities Service returned data of type ' + typeof(data));
      const extractedActivities: Activity[] = [];
      this.convertActivities(extractedActivities, (data._embedded === undefined) ? {} : data._embedded.activityResourceList);
  
      return extractedActivities;
    }

    private convertActivities(activities: Activity[], sourceData: any): void {
      for (const i in sourceData) {
        if (sourceData[i] !== undefined) {
          const activity: Activity = new Activity();
          Object.assign(activity, sourceData[i]);
  
          activities[i] = activity;
        }
      }
    }
    
    getActivities(): Observable<any> {
      return this.http.get(this.endpoint + 'Activities/').pipe(
        // tap(data => console.log('Output from getActivities()' + JSON.stringify(data))),
        map(data => this.extractData(data))
      );
    }

    updateActivity(id: number, name: string, url: string, icon: string): void {
      console.log('activities.service (updateActivity): updating activity ' + name);

      const editUrl = this.endpoint + 'Activities/' + id;
      console.log('Update URL: ' + editUrl);

      const activityAsJson: string = JSON.stringify(
        {'identifier': id, 'name': name, 'url': url, 'icon': icon},
        ['identifier', 'name', 'url', 'icon']);
      console.log('projects.service: JSON representation = ' + activityAsJson);

      this.http.put(editUrl, activityAsJson).subscribe(res => console.log(res));
    }

    createActivity(id: number, name: string, url: string, icon: string) {
      console.log('activities.service: creating activity ' + name);

      const createUrl: string = this.endpoint + 'Activities/';
      console.log('activities.service: Create URL: ' + createUrl);

      const activityAsJson: string = JSON.stringify(
        {'identifier': id, 'name': name, 'url': url, 'icon': icon},
        ['identifier', 'name', 'url', 'icon']);
      console.log('activities.component: JSON representation = ' + activityAsJson);

      this.http.post(createUrl, activityAsJson).subscribe(res => console.log(res));
    }

    deleteActivity(id: number) {
      console.log('activities.service (deleteActivity): deleting activity ' + id);

      const deleteUrl = this.endpoint + 'Activities/' + id;
      console.log('Delete URL: ' + deleteUrl);

      this.http.delete(deleteUrl).subscribe(res => console.log(res));
    }

    getActivity(id: number): Observable<any> {
      console.log('activities.service: Fetching ' + id);

      const fetchUrl = this.endpoint + 'Activities/' + id;
      console.log('Fetch URL: ' + fetchUrl);

      return this.http.get(fetchUrl);
    }

    openActivitiesFile(): void {
      console.log('activities.service: Opening file');

      const openUrl = this.endpoint + 'Activities/open';
      console.log('Open URL: ' + openUrl);

      this.http.post(openUrl, null).subscribe(res => console.log(res));
    }
}
