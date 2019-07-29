
export class SearchResult {
    public task: string;
    public taskId: number;
    public link: string;
    public project: string;
    public projectId: number;

    constructor(project: string, projectId: number, task: string, taskId: number, link: string) {
        this.project = project;
        this.projectId = projectId;
        this.task = task;
        this.taskId = taskId;
        this.link = link;
    }
}
