import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Chapter} from '../../model/chapterModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChapterService} from '../../services/chapter.service';

@Component({
    selector: 'app-view-chapter',
    templateUrl: './view-chapter.component.html',
    styleUrls: ['./view-chapter.component.css']
})
export class ViewChapterComponent implements OnInit {

    chapter: Chapter;
    chapterForm: FormGroup;

    constructor(private chapterService: ChapterService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                const resolvedData = data;
                console.log('resolved chapter', resolvedData.resolvedChapter);

                this.chapter = resolvedData.resolvedChapter;

                this.chapterForm = this.formBuilder.group({
                    id: [{value: this.chapter.id, disabled: true}, [Validators.required]],
                    name: [{value: this.chapter.name}, [Validators.required]],
                });
            },
            // err => console.error(err),
            // () => {
            //   console.log(`event ${this.event.id} loaded completely`);
            // }
        );
    }

    isValid(): boolean {
        return this.chapterForm.dirty;
    }

    saveChapter(): void {
        console.log('saving chapter');

        const chapterToUpdate = {
            id: this.chapterForm.get('id').value,
            name: this.chapterForm.get('name').value,
        };
        console.log('chapter to create', chapterToUpdate);

        this.chapterService.updateChapter(chapterToUpdate).subscribe(
            data => {
                console.log('Event creation returned successful', data);
                this.chapter = data;
                // this.onSaveComplete();
            },
            error => {
                console.log('Create event errored!');
                console.log('err', error);
            },
            () => {
            }
        );
    }

    deleteChapter(): void {
        this.chapterService.deleteChapter(this.chapter.id)
            .subscribe(
                data => {
                    console.log('');
                },
                error => {
                    console.log('Error deleting chappter', error);
                },
                () => {
                    this.router.navigate(['panel']);
                }
            );
    }
}
