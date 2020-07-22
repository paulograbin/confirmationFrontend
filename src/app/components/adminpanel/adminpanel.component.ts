import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserInterface} from '../../model/userModel';
import {ChapterService} from '../../services/chapter.service';
import {EventServiceService} from '../../services/event-service.service';
import {Chapter} from '../../model/chapterModel';
import {EventInterface} from '../../model/eventModel';

@Component({
    selector: 'app-adminpanel',
    templateUrl: './adminpanel.component.html',
    styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

    loggedUser: UserInterface;
    chapters: Chapter[];
    showChapters = false;

    events: EventInterface[];
    showEvents = false;

    users: UserInterface[];
    showUsers = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private chapterService: ChapterService,
                private eventService: EventServiceService) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                // console.log(data);
                const resolvedData = data;

                this.loggedUser = resolvedData.loggedUser;
                // console.log(this.loggedUser.chapter);
                // console.log(this.loggedUser.chapter.id);
                // console.log(this.loggedUser.chapter.name);
                // if (this.loggedUser.username !== 'plgrabin') {
                //     this.router.navigate(['events']);
                // }

                console.log(this.loggedUser.username);
            });

        this.userService.getCanAccessAdmin().subscribe(
            data => {
                console.log('can open returned', data);

                if (data === true) {
                    console.log('can open');
                } else {
                    console.log('CANT open');
                }
            }
        );

        this.userService.getAllUsers().subscribe(
            data => {
                console.log(data);
                this.users = data;
            }
        );
        this.chapterService.fetchAllChapters().subscribe(
            data => {
                this.chapters = data;
            }
        );

        this.eventService.getAllEvents().subscribe(
            data => {
                this.events = data;
                console.log(data);
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
