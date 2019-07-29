import { Component, OnInit } from '@angular/core';
import { ProjectSummaryService } from '../projectsummary.service';
import { Project } from '../project-list/project';
import { ProjectsService } from '../projects.service';
import { ApplicationSettings } from '../../app.settings';
import { LogHandler } from 'src/app/shared/loghandler';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-projectsummary',
  templateUrl: './projectsummary.component.html',
  styleUrls: ['./projectsummary.component.css']
})
export class ProjectsummaryComponent implements OnInit {

  returnObjects: any = [];
  projects: Project[];
  hub: string;

  constructor(private projectSummaryService: ProjectSummaryService,
              private projectsService: ProjectsService,
              private logHandler: LogHandler,
              private appSettings: ApplicationSettings) { }

  ngOnInit() {
    this.hub = this.appSettings.getActiveHub();
    this.getProjectSummary();
  }

  getProjectSummary() {
    console.log('projectsummary.component: Fetching project Summary...');
    this.projectSummaryService.getProjectSummary().subscribe(
      (data: any) => {
        console.log('projectsummary.component: Data:');
        console.log(data);
        // this.projects = (data._embedded !== undefined) ? data._embedded.projectResourceList : {};

        this.projects = []; 
        // this.projectsService.convertProjects(this.projects, this.returnObjects);
        this.projects = this.projectsService.extractData(data);
      },
      errMessage => this.handleError(errMessage)
    );
  }

  handleError(errorResponse: HttpErrorResponse) {
    this.logHandler.logMessage(errorResponse.message);
  }

}
