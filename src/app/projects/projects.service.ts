import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Project } from './project-list/project';
import { Task } from './task-edit/task';
import { ApplicationSettings } from '../app.settings';
import { TaskCategory } from './task-edit/taskcategory';
import { TaskStatus } from './task-edit/taskstatus';
import { environment } from 'src/environments/environment';
import { LogHandler } from '../shared/loghandler';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

    endpoint = environment.apiUrl + this.appSettings.getActiveHub() + '/';

    @Output() projectsLastUpdated: EventEmitter<number> = new EventEmitter();

    constructor(private http: HttpClient,
                private logHandler: LogHandler,
                private appSettings: ApplicationSettings) { }

    getProjectsLastUpdated(): EventEmitter<number> {
      return this.projectsLastUpdated;
    }

    getProjects(): Observable<any> {
      console.log('projects.service.ts: Fetching projects');
      return this.http.get(this.endpoint + 'Projects/').pipe(
        map(data => this.extractData(data)));
    }

    getArchivedProjects(): Observable<any> {
      console.log('projects.service.ts: Fetching archived projects');
      return this.http.get(this.endpoint + 'Projects/archive').pipe(
        // tap(data => console.log('Output from getArchivedProjects()' + JSON.stringify(data))),
        map(data => this.extractData(data)));
    }

    public extractData(data: any): Project[] {
      console.log('===> Projects Service returned data of type ' + typeof(data));
      const extractedProjects: Project[] = [];
      this.convertProjects(extractedProjects, (data._embedded === undefined) ? {} : data._embedded.projectResourceList);

      return extractedProjects;
    }

    private convertProjects(projects: Project[], sourceData: any): void {
      let rawProjects: Project[] = [];
      for (const i in sourceData) {
        if (sourceData[i] !== undefined) {
          // console.log('projects.service: converting source data ' + i);
          const proj: Project = new Project(-1,'','',5);
          Object.assign(proj, sourceData[i]);

          rawProjects[i] = proj;
          // console.log('projects.service: project name ' + i + ': ' + rawProjects[i].name);
          // console.log('projects.service: project view ' + i + ': ' + rawProjects[i].view);

          // console.log('projects.service: project has ' + sourceData[i].tasks.length + ' tasks');
          for (const x in sourceData[i].tasks) {
            if (sourceData[i].tasks !== undefined) {
              const task: Task = new Task(-1, '', '', '', '', '', '');
              Object.assign(task, sourceData[i].tasks[x]);
              // console.log('projects.service: task location (before) ' + i + ': ' + sourceData[i].tasks[x].location);
              task.location = sourceData[i].tasks[x].location;
              // console.log('projects.service: task location (after) ' + i + ': ' + task.location);
              task.category = sourceData[i].tasks[x].category;
              task.categoryEnum = TaskCategory.findByKey(sourceData[i].tasks[x].category);
              task.status = TaskStatus.findByKey(sourceData[i].tasks[x].status);
              rawProjects[i].tasks[x] = task;

              // console.log("projects.service: task category " + x + ": " + rawProjects[i].tasks[x].category);
            }
          }
        }
      }

      // Sort the projects by group
      rawProjects = rawProjects.sort(this.sortProjects);
      rawProjects.forEach(element => {
        projects[projects.length] = element;
      });
      console.log("==> projects.service: converted projects: ");
      console.log(projects);
    }

    private sortProjects(a: Project, b: Project) {
      return a.group < b.group ? -1 : 1;
    }

    // Fetch the project based on the project view
    getProject(projectId: string): Observable<Project> {
      console.log('ProjectsService: Fetching ' + projectId);

      const fetchUrl = this.endpoint + 'Projects/' + projectId;
      console.log('Fetch URL: ' + fetchUrl);

      return this.http.get<Project>(fetchUrl);
    }

    updateProject(project: Project): void {
      console.log('projects.service (updateProject): updating project ' + project.name);

      const editUrl = this.endpoint + 'Projects/' + project.identifier;
      console.log('Update URL: ' + editUrl);

      const projectAsJson: string = JSON
          .stringify(project, ['identifier', 'name', 'view', 'group'])
          .replace(/identifier(?=\":)/g,"id");
      console.log('projects.service: JSON DTO representation = ' + projectAsJson);

      this.http.put(editUrl, projectAsJson).subscribe(
        res => console.log(res),
        error => this.handleError(error),
        () => this.onFinishedUpdating()
      );
    }

    createProject(project: Project) {
      console.log('projects.service: creating project ' + project.name);

      const createUrl: string = this.endpoint + 'Projects/';
      console.log('projects.service: Create URL: ' + createUrl);

      const projectAsJson: string = JSON
          .stringify(project, ['identifier', 'name', 'view', 'group'])
          .replace(/identifier(?=\":)/g,"id");
      console.log('projects.component: JSON representation = ' + projectAsJson);

      this.http.post(createUrl, projectAsJson).subscribe(
        res => console.log(res),
        error => this.handleError(error),
        () => this.onFinishedUpdating()
      );
    }

    deleteProject(project: Project) {
      console.log('projects.service (deleteProject): deleting project ' + project.name);

      const deleteUrl = this.endpoint + 'Projects/' + project.identifier;
      console.log('Delete URL: ' + deleteUrl);

      this.http.delete(deleteUrl).subscribe(
        res => console.log(res),
        error => this.handleError(error),
        () => this.onFinishedUpdating()
      );
    }

    archiveProject(project: Project) {
      console.log('projects.service (archiveProject): archiving project ' + project.name);

      const archiveUrl = this.endpoint + 'Projects/' + project.identifier + '/archive';
      console.log('Archive URL: ' + archiveUrl);

      this.http.post(archiveUrl, null).subscribe(
        res => console.log(res),
        error => this.handleError(error),
        () => this.onFinishedUpdating()
      );
    }

    restoreProject(projectId: number) {
      console.log('projects.service (restoreProject): restoring project ' + projectId);

      const restoreUrl = this.endpoint + 'Projects/' + projectId + '/restore';
      console.log('Restore URL: ' + restoreUrl);

      this.http.post(restoreUrl, null).subscribe(
        res => console.log(res),
        error => this.handleError(error),
        () => this.onFinishedUpdating()
      );
    }

    onFinishedUpdating(): void {
      // this.projectsLastUpdated = Date.now();
      this.projectsLastUpdated.emit(Date.now());
    }

    handleError(errorResponse: HttpErrorResponse) {
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
