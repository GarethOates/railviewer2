import { Component, OnInit } from '@angular/core'
import { RouteParams } from '@angular/router-deprecated'
import { TimetableService } from './timetable.service'
import { HTTP_PROVIDERS } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/observable/forkJoin'
import 'rxjs/add/observable/interval'

@Component({
    selector: 'timetable',
    templateUrl: 'app/timetable.component.html',
    providers: [TimetableService, HTTP_PROVIDERS]
})
export class TimetableComponent implements OnInit {

    City: string;
    Timetable;
    Time: number = Date.now();
    Error: string;
    isLoading = true;

    constructor(private params: RouteParams, private dataService: TimetableService) { }

    ngOnInit() {
        this.City = this.params.get('city');
        this.Time = Date.now();
        this.loadData(this.City);

        Observable.interval(1000).subscribe(result => {
            this.Time = Date.now();
        });

        Observable.interval(60000).subscribe(() => {
            this.isLoading = true;
            this.loadData(this.City);
        });
    }

    loadData(city: string) {
        if (city != "") {
            Observable.forkJoin(
                this.dataService.getArrivals(city),
                this.dataService.getDepartures(city)
            ).map(results => new Object({ arrivals: results[0], departures: results[1] }))
                .subscribe(response => {
                    console.log(response);
                    this.Timetable = response;
                    this.isLoading = false;
                }, error => {
                    this.isLoading = false;
                    this.Error = error;
                });
        }
    }
}