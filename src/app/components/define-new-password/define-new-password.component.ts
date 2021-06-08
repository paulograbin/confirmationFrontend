import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordRequest} from '../../model/passwordRequest';
import {PasswordResetService} from '../../services/password-reset.service';

@Component({
    selector: 'app-define-new-password',
    templateUrl: './define-new-password.component.html',
    styleUrls: ['../meusdados/meusdados.component.css']
})
export class DefineNewPasswordComponent implements OnInit {

    passwordRequest: PasswordRequest;
    passwordForm: FormGroup;

    confirmed = false;
    confirmationMessage = '';


    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private userService: PasswordResetService) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                this.passwordRequest = data.passwordRequestRequest;

                if (this.passwordRequest.successful) {
                    console.log('Valid');
                } else {
                    console.log('Invalid');
                }
            }
        );

        this.passwordForm = this.formBuilder.group({
            password: ['', [Validators.required,
                Validators.minLength(6),
                Validators.maxLength(128)]],
            passwordConfirmation: ['', [Validators.required,
                Validators.minLength(6),
                Validators.maxLength(128)]],
        });
    }

    isValid() {
        return this.passwordForm.valid &&
            this.passwordForm.get('password').value === this.passwordForm.get('passwordConfirmation').value;
    }

    changePassword(): void {
        const passwordUpdateRequest = {
            requestCode: this.passwordRequest.requestCode,
            password: this.passwordForm.get('password').value
        };

        this.userService.defineNewPasswordAfterForgot(passwordUpdateRequest)
            .subscribe(
                data => {
                    console.log(data);
                },
                error => {
                    this.confirmed = true;
                    this.confirmationMessage = 'Ocorreu algum problema na troca da senha';
                },
                () => {
                    setTimeout(function() {
                        this.confirmed = false;
                    }.bind(this), 3000);
                }
            );
    }
}
