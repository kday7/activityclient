import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskContentComponent } from './taskcontent/taskcontent.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectsummaryComponent } from './projectsummary/projectsummary.component';
import { RouterModule } from '@angular/router';
import { ProjectsResolver } from './project-list/projects.resolver';
import { ProjectResolver } from './project-edit/project.resolver';
import { TaskResolver } from './task-edit/task.resolver';
import { ProjectNamesResolver } from './project-list/project-names.resolver';
import { ArchiveComponent } from './archive/archive.component';
import { ArchiveResolver } from './archive/archive.resolver';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProjectListComponent,
    TaskEditComponent,
    TaskContentComponent,
    ProjectsummaryComponent,
    ProjectEditComponent,
    ArchiveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: ':hub/projects', component: ProjectListComponent,
                resolve: {projects: ProjectsResolver},
                runGuardsAndResolvers: 'always' },
      { path: ':hub/projects/:projectid/edit', component: ProjectEditComponent,
                resolve: { project: ProjectResolver },
                runGuardsAndResolvers: 'always' },
      { path: ':hub/projects/:projectid/tasks/:taskid', component: TaskContentComponent,
                resolve: { task: TaskResolver },
                runGuardsAndResolvers: 'always' },
      { path: ':hub/projects/:projectid/tasks/:taskid/edit', component: TaskEditComponent,
                resolve: { allProjects: ProjectNamesResolver,
                           task: TaskResolver,
                           project: ProjectResolver },
                runGuardsAndResolvers: 'always' },

      { path: ':hub/archive', component: ArchiveComponent,
                resolve: { archive: ArchiveResolver },
                runGuardsAndResolvers: 'always' }

    ])
  ],
  exports: [
    ProjectsummaryComponent
  ],
  providers: [
    TaskResolver,
    ProjectResolver,
    ProjectsResolver,
    ProjectNamesResolver,
    ArchiveResolver
  ]
})
export class ProjectsModule { }
