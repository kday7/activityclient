import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PropertiesService } from '../properties.service';

@Injectable()
export class PropertiesResolver implements Resolve<any> {

  properties: any;

  constructor(public propertiesService: PropertiesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    // console.log('properties.resolver: Property name: ' + route.params.properties );

    this.getProperties();
    console.log('properties.resolver: resolve finished');
    return this.properties;
  }

  private getProperties(): void {
    this.properties = this.propertiesService.getProperties();
    console.log('properties.resolver: Call to getProperties has finished');
  }
}
