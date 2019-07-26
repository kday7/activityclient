import { Component, OnInit } from '@angular/core';

import { ApplicationSettings } from '../../app.settings';
import { ProjectsService } from '../../projects/projects.service';
import { Project } from '../../projects/project-list/project';
import { TaskService } from 'src/app/projects/task.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  title = 'My Hub';
  logo = 'assets/images/aquila_bird_purple.png';
  hub = 'MyHub';

  projects: Project[];
  returnObjects: any = [];

  constructor(private projectsService: ProjectsService,
              private tasksService: TaskService,
              private appSettings: ApplicationSettings) { }

  ngOnInit() {
    this.appSettings.setTheme();
    this.title = this.appSettings.getTitle();
    this.logo = this.appSettings.getLogo();
    this.hub = this.appSettings.getActiveHub();
    console.log('menubar.component: Active hub: ' + this.hub);

    if (this.hub !== '') {
      this.getProjects();
    }

    this.projectsService.getProjectsLastUpdated().subscribe(() => {
      console.log('menubar.component: Projects have been updated');
      this.getProjects();
    });

    this.tasksService.getTasksLastUpdated().subscribe(() => {
      console.log('menubar.component: Tasks have been updated');
      this.getProjects();
    });
  }

  getProjects() {
      console.log('menubar.component: Fetching projects for sidebar...');
      this.projectsService.getProjects().subscribe((data: Project[]) => {
          console.log('menubar.component: Data...');
          this.projects = data;
          console.log(this.projects);

          // this.projects = [];
          // this.projectsService.convertProjects(this.projects, this.returnObjects);
      });
  }

}
