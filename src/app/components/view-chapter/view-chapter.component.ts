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
        this.chapterForm = this.formBuilder.group({
            id: [{value: '', disabled: true}, [Validators.required]],
            name: ['', [Validators.required]],
        });

        this.route.data.subscribe(
            data => {
                this.chapter = data.resolvedChapter;

                this.displayChapter();
            },
            err => console.error(err),
            () => {
                console.log(`chapter ${this.chapter.id} loaded completely`);
            }
        );
    }

    private displayChapter() {
        this.chapterForm.patchValue({
            id: this.chapter.id,
            name: this.chapter.name,
        });
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
        console.log('chapter to update', chapterToUpdate);

        this.chapterService.updateChapter(chapterToUpdate).subscribe(
            data => {
                console.log('Chapter update returned successful', data);

                this.chapter = data;
                this.displayChapter();
            },
            error => {
                console.log('Chapter update errored!');
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
