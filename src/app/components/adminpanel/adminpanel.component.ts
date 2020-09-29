import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserInterface} from '../../model/userModel';
import {ChapterService} from '../../services/chapter.service';
import {EventServiceService} from '../../services/event-service.service';
import {Chapter} from '../../model/chapterModel';
import {EventInterface} from '../../model/eventModel';
import {MetricsService} from '../../services/metrics.service';
import {MetricsResponse} from '../../model/metricsResponse';

@Component({
    selector: 'app-adminpanel',
    templateUrl: './adminpanel.component.html',
    styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

    loggedUser: UserInterface;
    metrics: MetricsResponse;

    chapters: Chapter[];
    showChapters = false;

    events: EventInterface[];
    showEvents = false;

    users: UserInterface[];
    showUsers = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private metricsService: MetricsService,
                private userService: UserService,
                private chapterService: ChapterService,
                private eventService: EventServiceService) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                // console.log(data);
                this.loggedUser = data.loggedUser;

                if (this.loggedUser.username !== 'plgrabin') {
                    console.log('Not so fast champ');
                    this.router.navigate(['events']);
                } else {
                    this.userService.getAllUsers().subscribe(
                        userData => {
                            // console.log(userData);
                            this.users = userData;
                        }
                    );
                    this.chapterService.fetchAllChapters().subscribe(
                        chapterData => {
                            // console.log(chapterData);
                            this.chapters = chapterData;
                        }
                    );

                    this.eventService.getAllEvents().subscribe(
                        eventData => {
                            this.events = eventData;
                            // console.log(eventData);
                        }
                    );
                }
            });

        this.metricsService.fetchAllMetrics().subscribe(
            data => {
                console.log(data);
                this.metrics = data;
            }, error => {
                console.log('Error loading metrics');
            }
        );
    }

    toggleChapters() {
        console.log('Toggle chapters');
        this.showChapters = !this.showChapters;
    }

    toggleEvents() {
        console.log('Toggle events');
        this.showEvents = !this.showEvents;
    }

    toggleUsers() {
        console.log('Toggle users');
        this.showUsers = !this.showUsers;
    }
}
