import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserInterface} from '../../model/userModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChapterService} from '../../services/chapter.service';
import {Chapter} from '../../model/chapterModel';
import {UserService} from '../../services/user.service';
import {log} from 'util';

@Component({
    selector: 'app-meusdados',
    templateUrl: './meusdados.component.html',
    styleUrls: ['./meusdados.component.css']
})
export class MeusdadosComponent implements OnInit {

    loggedUser: UserInterface;
    passwordForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private userService: UserService) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                console.log(data);
                const resolvedData = data;

                this.loggedUser = resolvedData.loggedUser;
                console.log(this.loggedUser.chapter);
                console.log(this.loggedUser.chapter.id);
                console.log(this.loggedUser.chapter.name);
            });

        this.passwordForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    isValid() {
        if (this.passwordForm.get('password').value != null &&
            this.passwordForm.get('password').value.length > 0 &&
            this.passwordForm.get('password').value === this.passwordForm.get('passwordConfirmation').value) {
            return true;
        }

        return false;
    }

    changePassword(): void {
        console.log('Changing password');

        const passwordUpdateRequest = {
            firstName: this.loggedUser.firstName,
            lastName: this.loggedUser.lastName,
            password: this.passwordForm.get('password').value
        };

        console.log('Request ', passwordUpdateRequest);

        this.userService.updateUser(this.loggedUser.id, passwordUpdateRequest).subscribe(
            data => {
                console.log(data);
                this.passwordForm.reset();
            },
            error => {
                console.log('Ops não deu pra atualizar');
            }
        );
    }
}
