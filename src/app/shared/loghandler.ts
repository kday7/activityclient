import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LogHandler {

    public logMessage(message: string): void {
        document.getElementById('status').innerText = message;
    }

}
