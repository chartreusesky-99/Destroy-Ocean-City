import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-header',
  imports: [ NgClass, RouterLink ],
  templateUrl: './header.html'
})
export class Header {

  constructor( public theme: ThemeService ) {}

  ngOnInit() {}

}
