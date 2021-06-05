import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators';
import {PasswordResetService} from '../../services/password-reset.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['../../login/login.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    forgotPasswordFeatureEnabled = false;

    form: FormGroup;
    loading = false;
    submitted = false;

    errorMessage = '';
    successMessage = '';

    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private resetPasswordService: PasswordResetService) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                this.forgotPasswordFeatureEnabled = data.features.ENABLE_RESET_PASSWORD;
            });

        if (this.forgotPasswordFeatureEnabled === false) {
            this.successMessage = '';
            this.errorMessage = 'Essa funcionalidade ainda não está disponível';
        }

        this.form = this.formBuilder.group({
            email: [{value: '', disabled: !this.forgotPasswordFeatureEnabled}, [Validators.required, Validators.email]]
        });
    }

    get f() {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            this.errorMessage = 'Esse email não parece certo, tem certeza?';
            return;
        }

        this.loading = true;
        this.errorMessage = '';
        this.resetPasswordService.submitNewForgotPasswordRequest(this.f.email.value)
            .pipe(first())
            .pipe(finalize(() => this.loading = false))
            .subscribe(data => {
                if (data.successful) {
                    this.errorMessage = '';
                    this.successMessage = 'Você receberá um email com instruções para definir uma nova senha';
                } else {
                    this.errorMessage = 'Esse email não parece certo, tem certeza?';
                    this.successMessage = '';
                }
            });
    }
}
