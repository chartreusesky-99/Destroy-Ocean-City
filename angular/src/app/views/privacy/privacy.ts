import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-privacy',
  imports: [ DatePipe ],
  templateUrl: './privacy.html'
})
export class Privacy {

  public currentDate = new Date();

}
