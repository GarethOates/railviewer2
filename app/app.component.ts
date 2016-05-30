import { Component } from '@angular/core'
import { TimetableComponent } from './timetable.component'
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated'


@RouteConfig([
  { path: '/timetables/:city', useAsDefault: true, name: "Main", component: TimetableComponent },
  { path: '/*other', redirectTo: ['Main', { city: "Aberdeen"}] }
])
@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>',
  directives: [TimetableComponent, ROUTER_DIRECTIVES]
})
export class AppComponent {
  constructor() {
  }
}