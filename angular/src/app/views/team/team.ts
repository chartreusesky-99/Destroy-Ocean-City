import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.html',
  styles:`
    .hero-intro-container {
      margin-bottom: 1rem;
      display: flex;
      gap: 1rem;
    }
    .hero-photo-container {
      height: 100px;
      width: auto;
    }
    .hero-photo {
      height: 100px;
      width: auto;
      border-radius: 45%;
      filter: brightness(110%);
    }
    .hero-title-container {
      width: 100%;
      display: flex;
      align-items: center;
    }
    .hero-title-text {
      margin: 0;
    }
  `
})
export class Team {
  

}
