import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProjectsService } from '../projects.service';

@Injectable()
export class ProjectNamesResolver implements Resolve<any> {

    allProjects: any;

    constructor(public projectsService: ProjectsService) {}

    resolve(route: ActivatedRouteSnapshot) {
        this.getProjectNames();
        console.log('ProjectNamesResolver: resolve finished');
        return this.allProjects;
    }

    private getProjectNames(): void {
        this.allProjects = this.projectsService.getProjects();
        console.log('ProjectNamesResolver: Call to getProjectNames has finished');
    }
}
