import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AlertService} from '../../services/alert/alert.service';
import {PasswordResetService} from '../../services/password-reset.service';


enum TokenStatus {
    Validating,
    Valid,
    Invalid
}

@Component({
    selector: 'app-define-new-password',
    templateUrl: './define-new-password.component.html',
    styleUrls: ['../../login/login.component.css']
})
export class DefineNewPasswordComponent implements OnInit {

    TokenStatus = TokenStatus;
    tokenStatus = TokenStatus.Validating;
    passwordRequestToken = null;
    form: FormGroup;
    loading = false;
    submitted = false;
    private passwordRequest: any;

    errorMessage = '';
    successMessage = '';


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private passwordResetService: PasswordResetService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                this.passwordRequest = data.passwordRequestRequest;

                if (this.passwordRequest.successful) {
                    this.passwordRequestToken = this.passwordRequest.requestCode;
                    this.tokenStatus = TokenStatus.Valid;
                } else {
                    this.tokenStatus = TokenStatus.Invalid;
                }
            }
        );

        this.form = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
        });

          // remove token from url to prevent http referer leakage
        this.router.navigate([], {relativeTo: this.route, replaceUrl: true});
    }

    isValid() {
        return this.form.valid &&
            this.form.get('password').value === this.form.get('confirmPassword').value;
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        // this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        const newPasswordRequest = {
            requestCode: this.passwordRequest.requestCode,
            password: this.f.password.value,
        };

        this.passwordResetService.defineNewPasswordAfterForgot(newPasswordRequest)
            .pipe(first())
            .subscribe(
                () => {
                    this.emptyFields();
                    this.successMessage = 'Sua senha foi redefinida com sucesso, clique aqui para logar novamente ';

                    this.alertService.success('Password reset successful, you can now login', {keepAfterRouteChange: true});
                    // this.router.navigate(['/login'], {relativeTo: this.route});
                },
                () => {
                    // this.alertService.error(error);
                    this.loading = false;
                    this.errorMessage = 'Não conseguimos mudar a sua senha, tente novamente';
                }
            );
    }

    emptyFields() {
        this.form.reset();
    }
}
