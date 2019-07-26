import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApplicationSettings } from '../../app.settings';
import { TaskService } from '../../projects/task.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  hub = 'ActivityHub';

  archiving = false;
  postItWall = false;
  taskCompletion = false;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private appSettings: ApplicationSettings) {
  }

  ngOnInit() {
    console.log('toolbar: config endpoint: ' + environment.apiUrl);
    this.appSettings.setTheme();

    this.hub = this.appSettings.getActiveHub();
    console.log('toolbar: Active hub: ' + this.hub);

    this.archiving = this.appSettings.archiving;
    this.postItWall = this.appSettings.postItWall;
    this.taskCompletion = this.appSettings.taskCompletion;
    console.log('toolbar: Task completion: ' + this.taskCompletion);
  }

  editCurrentTask() {
    // Get the project and task from the url and post a request to the server.
    // Assumes a URL of the format http://localhost:4200/ActivityHub/projects/1/tasks/taskHub
    const urlComponentsString = (String)(this.route.snapshot.firstChild.url);
    console.log('URL components: ' + urlComponentsString);

    const urlComponents = urlComponentsString.split(',');
    console.log('First URL component: ' + urlComponents[0]);
    console.log('Second URL component: ' + urlComponents[1]);

    const projectId = urlComponents[2];
    console.log('Project URL component: ' + projectId);

    const task = urlComponents[4];
    console.log('Task URL component: ' + task);

    this.taskService.openTaskForEditing(projectId, task, 'N');
  }

  completeCurrentTask() {
    // Get the project and task from the url and post a request to the server.
    // Assumes a URL of the format http://localhost:4200/ActivityHub/projects/hubs/taskHub
    const urlComponentsString = (String)(this.route.snapshot.firstChild.url);
    console.log('URL components: ' + urlComponentsString);

    const urlComponents = urlComponentsString.split(",");
    console.log('First URL component: ' + urlComponents[0]);
    console.log('Second URL component: ' + urlComponents[1]);

    const project = urlComponents[2];
    console.log('Project URL component: ' + project);

    const task = urlComponents[4];
    console.log('Task URL component: ' + task);

    this.taskService.completeTask(project, task);

    // TODO: refresh the menu bar
  }

}
