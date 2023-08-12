import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menuType: string = 'reveal';
  public appPages = [
    {
      title: 'Home',
      url: '/news',
      icon: 'home'
    },
    {
      title: 'Ask',
      url: '/ask',
      icon: 'bar-chart'
    },
    {
      title: 'Show',
      url: '/show',
      icon: 'image'
    },
    {
      title: 'Jobs',
      url: '/jobs',
      icon: 'bulb'
    }
  ];
  constructor() {}
}
