import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserInterface} from '../../model/userModel';
import {Chapter} from '../../model/chapterModel';

@Component({
    selector: 'app-view-chapter',
    templateUrl: './view-chapter.component.html',
    styleUrls: ['./view-chapter.component.css']
})
export class ViewChapterComponent implements OnInit {

    chapter: Chapter;
    loggedUser: UserInterface;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        console.log('view chapter');

        this.route.data.subscribe(
            data => {
                const resolvedData = data;
                console.log('resolved chapter', resolvedData.resolvedChapter);

                this.chapter = resolvedData.resolvedChapter;
                this.loggedUser = resolvedData.loggedUser;

                // if (this.event.creatorId === this.loggedUser.id) {
                //     console.log('MC vendo seu evento');
                // } else {
                //     console.log('É só um qualquer');
                // }
            },
            // err => console.error(err),
            // () => {
            //   console.log(`event ${this.event.id} loaded completely`);
            // }
        );

    }

}
