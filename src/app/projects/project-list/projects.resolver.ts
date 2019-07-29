import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProjectsService } from '../projects.service';

@Injectable()
export class ProjectsResolver implements Resolve<any> {

  projects: any;

  constructor(public projectsService: ProjectsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    console.log('projects.resolver: Project name: ' + route.params.project );

    this.getProjects();
    console.log('projects.resolver: resolve finished');
    return this.projects;
  }

  private getProjects(): void {
    this.projects = this.projectsService.getProjects();
    console.log('projects.resolver: Call to getTask has finished');
  }
}
