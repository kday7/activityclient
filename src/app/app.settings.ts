import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ApplicationSettings {

    title = 'My Hub';
    icon = 'favicon.ico';
    logo = 'assets/images/aquila_bird_purple.png';

    // Icon bar options
    archiving = false;
    postItWall = false;
    taskCompletion = false;

    getTitle(): string {
        return this.title;
    }

    getIcon(): string {
        return this.icon;
    }

    getLogo(): string {
        return this.logo;
    }

    getActiveHub(): string {
        let hub = '';
        const urlPath = window.location.pathname;
        console.log('app.settings: url: ' + urlPath);

        const baseUrl = document.getElementsByTagName('base')[0].href;
        console.log('app.settings: baseUrl: ' + baseUrl);

        if (urlPath === '/activity-client/') {
            hub = '';
        } else if (urlPath.startsWith('/activity-client/')) {
            hub = urlPath.substr('/activity-client/'.length, urlPath.indexOf('Hub') + 3 - '/activity-client/'.length);
        } else if (urlPath.lastIndexOf('/') > 0) {
            hub = urlPath.substr(1, urlPath.indexOf('Hub/') + 2);
        } else {
            hub = urlPath.substr(1);
        }
        console.log('app.settings: Active hub: ' + hub);
        return hub;
    }

    setTheme() {
        const bodyStyles = document.body.style;
        if (this.getActiveHub() === 'ActivityHub') {
            bodyStyles.setProperty('--primary-hub-colour', '#6523b8');
            bodyStyles.setProperty('--border-hub-colour', '#883ce5');
            bodyStyles.setProperty('--primary-disabled-hub-colour', '#8a45df');
            bodyStyles.setProperty('--border-disabled-hub-colour', '#883ce5');
            bodyStyles.setProperty('--primary-statusbar-background-colour', '#c389ff');
            this.title = 'Activity Hub';
            this.icon = 'favicon-activityhub.ico';
            this.logo = 'assets/images/aquila_bird_purple.png';
            this.taskCompletion = true;
            this.postItWall = true;
            this.archiving = true;
            console.log('app.settings: Set theme for ActivityHub');

        } else if (this.getActiveHub() === 'TaskHub') {
            bodyStyles.setProperty('--primary-hub-colour', '#0747a6');
            bodyStyles.setProperty('--border-hub-colour', '#2767c6');
            bodyStyles.setProperty('--primary-disabled-hub-colour', '#0747a6cc');
            bodyStyles.setProperty('--border-disabled-hub-colour', '#2767c6');
            bodyStyles.setProperty('--primary-statusbar-background-colour', 'lightblue');
            this.title = 'Task Hub';
            this.icon = 'favicon-taskhub.ico';
            this.logo = 'assets/images/aquila_bird_blue.png';
            this.taskCompletion = true;
            this.archiving = true;
            console.log('app.settings: Set theme for TaskHub');

        } else if (this.getActiveHub() === 'InfoHub') {
            bodyStyles.setProperty('--primary-hub-colour', '#ca7800');
            bodyStyles.setProperty('--border-hub-colour', '#ea9820');
            bodyStyles.setProperty('--primary-disabled-hub-colour', '#da870bc7');
            bodyStyles.setProperty('--border-disabled-hub-colour', '#ea9820');
            bodyStyles.setProperty('--primary-statusbar-background-colour', '#ffd78d');
            this.title = 'Info Hub';
            this.icon = 'favicon-infohub.ico';
            this.logo = 'assets/images/aquila_bird_yellow.png';
            this.postItWall = true;
            console.log('app.settings: Set theme for InfoHub');

        } else {
            // Alternative colour: #00AA9E;
            bodyStyles.setProperty('--primary-hub-colour', '#932161');
            bodyStyles.setProperty('--border-hub-colour', '#932161');
            bodyStyles.setProperty('--primary-disabled-hub-colour', '#8a45df');
            bodyStyles.setProperty('--border-disabled-hub-colour', '#883ce5');
            this.title = 'My Hub';
            this.icon = 'favicon-activityhub.ico';
            this.logo = 'assets/images/aquila_bird_purple.png';
            console.log('app.settings: Set random theme');
        }

        this.changeHeaderIcon();
        this.changeHeaderTitle();
    }

    // Change the icon in the title bar
    changeHeaderIcon(): void {
        const links = document.getElementsByTagName('link');
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            if (link.getAttribute('rel').indexOf('icon') !== -1) {
                link.setAttribute('href', 'assets/images/' + this.icon);
                console.log('app.settings: title bar icon changed to ' + this.icon);
            }
        }
    }

    // Change the title in the title bar
    changeHeaderTitle(): void {
        const titles = document.getElementsByTagName('title');
        for (let i = 0; i < titles.length; i++) {
            const title = titles[i];
            title.text = this.title;
            console.log('app.settings: title changed to ' + this.title);
        }
    }
}
