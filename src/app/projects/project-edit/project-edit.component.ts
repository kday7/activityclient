import { Component, OnInit } from '@angular/core';
import { Project } from '../project-list/project';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationSettings } from '../../app.settings';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  hub = 'MyHub';
  project: Project = new Project(-1, '', '', 5);

  constructor(private projectService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router,
    private appSettings: ApplicationSettings) { }

  ngOnInit() {
    this.hub = this.appSettings.getActiveHub();
    this.project = this.route.snapshot.data.project;
  }

  saveProject(): void {
    this.logProjectDetails('save');

    if (this.project.identifier === undefined || this.project.identifier === -1) {
      this.projectService.createProject(this.project);
    } else {
      this.projectService.updateProject(this.project);
    }

    this.router.navigate(['/' + this.hub, 'projects']);
  }

  deleteProject(): void {
    this.logProjectDetails('delete');
    this.projectService.deleteProject(this.project);

    this.router.navigate(['/' + this.hub, 'projects']);
  }

  archiveProject(): void {
    this.logProjectDetails('archive');
    this.projectService.archiveProject(this.project);

    this.router.navigate(['/' + this.hub, 'projects']);
  }

  cancelEdit(): void {
    this.router.navigate([this.hub, 'projects']);
  }

  nameChanged(newName: string) {
    console.log('project-edit.component: new name: ' + newName);
    const nameWithoutInvalidChars: string = newName.replace(/ /gi, "").replace(/\./gi, "_");
    const newView: string = nameWithoutInvalidChars.slice(0, 1).toLowerCase() + nameWithoutInvalidChars.slice(1);
    console.log('project-edit.component: modified name: ' + newView);

    this.project.view = newView;
  }

  logProjectDetails(method: string): void {
    if (this.project !== undefined) {
      const projectDetails = 'project[identifier=' + this.project.identifier +
                        ', name=' + this.project.name +
                        ', view=' + this.project.view +
                        ', group=' + this.project.group + ']';
      console.log('project-edit.component: project details [' + method + '] ' + projectDetails);
    }
  }
}
