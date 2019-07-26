import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProjectsService } from '../projects.service';

@Injectable()
export class ArchiveResolver implements Resolve<any> {

  archive: any;

  constructor(public projectsService: ProjectsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    // console.log('archive.resolver: Property name: ' + route.params.archive );

    this.getArchivedProjects();
    console.log('archive.resolver: resolve finished');
    return this.archive;
  }

  private getArchivedProjects(): void {
    this.archive = this.projectsService.getArchivedProjects();
    console.log('archive.resolver: Call to getArchivedProjects has finished');
  }
}
