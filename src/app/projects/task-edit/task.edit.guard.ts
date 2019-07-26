import { CanActivate } from "@angular/router";
import { ActivatedRouteSnapshot } from '@angular/router';

export class EditTaskGuard implements CanActivate {

  constructor() {}

  canActivate() {
    console.log("EditTaskGuard");



    return false;
  }
}
