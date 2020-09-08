import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ChapterService} from '../../services/chapter.service';
import {Chapter} from '../../model/chapterModel';

@Component({
    selector: 'app-meucapitulo',
    templateUrl: './meucapitulo.component.html',
    styleUrls: ['./meucapitulo.component.css']
})
export class MeuscapituloComponent implements OnInit {

    chapter: Chapter;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                console.log(data);
                this.chapter = data.resolvedChapter;
            });
    }
}
