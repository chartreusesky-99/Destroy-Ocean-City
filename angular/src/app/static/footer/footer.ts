import { Component, VERSION } from '@angular/core';
import { RouterLink } from '@angular/router';
import { version } from '../../../../package.json';

@Component({
  selector: 'app-footer',
  imports: [ RouterLink ],
  template: `
  <footer class="my-4">
    <div class="container px-md-5 px-sm-1">
      <hr>
      <div class="d-flex flex-wrap justify-content-between align-items-center">
        <div class="col-md-4 d-flex justify-content-start">
          <p class="mb-3 mb-md-0 text-body-secondary cursor-default">
            © {{currentYear}} Shadow Government Holdings, LLC
          </p>
        </div>
        <div class="col-md-4 d-flex align-items-center justify-content-end">
          <small class="m-0 version-text cursor-default monospace">
            {{versionString}}&nbsp;
          </small>
          <a href="javascript(0):void" [routerLink]="['/privacy']" style="text-decoration: none;">
            <i class="bi bi-shield-check"></i> Privacy
          </a>
        </div>
      </div>
    </div>
  </footer>
  `
})
export class Footer {

  versionString: string = `ng ${VERSION.full} app ${version}`;
  currentYear: number = new Date().getFullYear();

}
