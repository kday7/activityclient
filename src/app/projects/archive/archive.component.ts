import { Component, OnInit } from '@angular/core';
import { Project } from '../project-list/project';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationSettings } from '../../app.settings';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  hub: string;
  projects: Project[];

  constructor(private projectsService: ProjectsService,
              private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router,
              private appSettings: ApplicationSettings) { }

  ngOnInit() {
    this.hub = this.appSettings.getActiveHub();
    this.projects = this.route.snapshot.data.archive;
  }

  openTaskForEditing(projectId: string, task: string, archived: string) {
    this.taskService.openTaskForEditing(projectId, task, archived);
  }

  restoreProject(projectId: number) {
    this.projectsService.restoreProject(projectId);
    this.router.navigate(['/' + this.hub, 'projects']);
  }
}
