import { Injectable, EventEmitter, Inject, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ApplicationSettings } from '../app.settings';
import { Observable, of } from 'rxjs';
import { Task } from './task-edit/task';
import { environment } from 'src/environments/environment';
import { LogHandler } from '../shared/loghandler';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

    endpoint = environment.apiUrl + this.appSettings.getActiveHub() + '/';

    @Output() tasksLastUpdated: EventEmitter<number> = new EventEmitter();

    constructor(private http: HttpClient,
                private logHandler: LogHandler,
                private appSettings: ApplicationSettings) { }

    getTasksLastUpdated(): EventEmitter<number> {
      return this.tasksLastUpdated;
    }

    getTask(projectId: string, taskId: string): Observable<Task> {
      console.log('TaskService: Fetching ' + projectId + '/' + taskId);

      const fetchUrl = this.endpoint + 'Projects/' + projectId + '/Tasks/' + taskId;
      console.log('Fetch URL: ' + fetchUrl);

      return this.http.get<Task>(fetchUrl).pipe(
        // tap(data => console.log('Output from getTask()' + JSON.stringify(data)))
      );
    }

    openTaskForEditing(projectId: string, taskId: string, archived: string) {
      console.log('task.service.ts: opening task for editing ' + projectId + '/' + taskId);

      const openUrl = this.endpoint + 'Projects/' + projectId + '/Tasks/' + taskId + '/open?archived=' + archived;
      console.log('Open URL: ' + openUrl);

      this.http.put(openUrl, null).subscribe(res => console.log(res));
    }

    completeTask(projectId: String, taskId: String) {
      console.log('task.service.ts: completing task ' + projectId + '/' + taskId);

      const completionUrl = this.endpoint + 'Projects/' + projectId + '/Tasks/' + taskId + '/complete';
      console.log('Completion URL: ' + completionUrl);

      this.http.put(completionUrl, null).subscribe(
        res => console.log(res),
        error => this.handleError(error),
        () => this.onFinishedUpdating()
      );
    }

    updateTask(projectId: number, destinationProject: number, task: Task): void {
        console.log('task.service (updateTask): updating task ' + projectId + '/' + task.name);

        const editUrl = this.endpoint + 'Projects/' + projectId + '/Tasks/' + task.identifier + '?destination=' + destinationProject;
        console.log('Update URL: ' + editUrl);

        const taskAsJson: string = JSON
            .stringify(task, ['identifier', 'name', 'location', 'view', 'category', 'status'])
            .replace(/identifier(?=\":)/g,"id");
        console.log('task.service: JSON representation = ' + taskAsJson);

        this.http.put(editUrl, taskAsJson).subscribe(
          res => console.log(res),
          error => this.handleError(error),
          () => this.onFinishedUpdating()
        );
    }

    createTask(projectId: number, task: Task): void {
      console.log('task.service: creating task ' + projectId + '/' + task.name);
      const createUrl: string = this.endpoint + 'Projects/' + projectId + '/Tasks/' + task.identifier;
      console.log('task.service: Create URL: ' + createUrl);

      const taskAsJson: string = JSON
            .stringify(task, ['identifier', 'name', 'location', 'view', 'category', 'statusCode'])
            .replace(/identifier(?=\":)/g,"id");
      console.log('task.service: JSON representation = ' + taskAsJson);

      this.http.post(createUrl, taskAsJson).subscribe(
        res => console.log(res),
        error => this.handleError(error),
        () => this.onFinishedUpdating()
      );
    }

    deleteTask(projectId: number, task: Task) {
      console.log('task.service (deleteTask): deleting task ' + projectId + '/' + task.name);

      const editUrl = this.endpoint + 'Projects/' + projectId + '/Tasks/' + task.identifier;
      console.log('Delete URL: ' + editUrl);

      this.http.delete(editUrl).subscribe(
        res => console.log(res),
        error => this.handleError(error),
        () => this.onFinishedUpdating()
      );
    }

    onFinishedUpdating(): void {
      this.tasksLastUpdated.emit(Date.now());
    }

    handleError(errorResponse: HttpErrorResponse) {
      console.log(`Task Service: Error: ${errorResponse}`);
      this.logHandler.logMessage(errorResponse.message);
    }

    /* private handleError2<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    } */
}
