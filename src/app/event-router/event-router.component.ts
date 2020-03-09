import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserInterface} from '../model/userModel';

@Component({
    selector: 'app-event-router',
    templateUrl: './event-router.component.html',
    styleUrls: ['./event-router.component.css']
})
export class EventRouterComponent implements OnInit {

    private loggedUser: UserInterface;

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                // console.log('lets route!', data);
                this.loggedUser = data.loggedUser;

                if (this.loggedUser.master) {
                    // console.log('Manda pros created');
                    this.router.navigate(['createdEvents']);
                } else {
                    // console.log('Manda pros invited');
                    this.router.navigate(['events']);
                }
            }
        );
    }
}
