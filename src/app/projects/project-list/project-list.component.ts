import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../projects.service';

import { Project } from './project';
import { ApplicationSettings } from '../../app.settings';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, DoCheck {

  hub: string;
  projects: Project[];
  returnObjects: any = [];

  constructor(public projectsService: ProjectsService,
              private route: ActivatedRoute,
              private appSettings: ApplicationSettings) { }

  ngOnInit() {
    this.hub = this.appSettings.getActiveHub();
    // this.projects = this.route.snapshot.data.projects;
  }

  ngDoCheck() {
    this.projects = this.route.snapshot.data.projects;
  }

  toggleTasksDisplay(elem: string) {
    const tasksTableElement = document.getElementById(elem + 'Tasks');
    const tasksToggleElement = document.getElementById(elem + 'Toggle');

    if (tasksTableElement.style.display === 'none') {
      tasksTableElement.style.display = 'block';
      tasksToggleElement.innerText = 'Hide';
    } else {
      tasksTableElement.style.display = 'none';
      tasksToggleElement.innerText = '...';
    }
  }

}
