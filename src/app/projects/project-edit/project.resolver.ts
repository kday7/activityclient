import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { Observable } from 'rxjs';
import { Project } from '../project-list/project';


@Injectable()
export class ProjectResolver implements Resolve<any> {

  project: any;

  constructor(public projectService: ProjectsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    console.log('ProjectResolver: Project ID: ' + route.params.projectid );

    this.getProject(route.params.projectid);
    console.log('ProjectResolver: resolve finished');
    return this.project;
  }

  getProject(projectId: string) {
      this.project = undefined;
      console.log('ProjectResolver: Fetching project with id ' + projectId);

      if (projectId === '-1') {
        this.project = new Project(-1,'','',5);
      } else {
        this.project = this.projectService.getProject(projectId);
      }
      console.log('project.resolver: Call to getProject has finished');
  }
}
