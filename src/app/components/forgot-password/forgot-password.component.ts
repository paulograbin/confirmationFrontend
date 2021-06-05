import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['../../login/login.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    form: FormGroup;
    loading = false;
    submitted = false;

    errorMessage = '';
    successMessage = '';

    constructor(private formBuilder: FormBuilder,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    get f() {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            this.errorMessage = 'Esse email não parece certo, tem certeza';
            return;
        }

        this.loading = true;
        this.errorMessage = '';
        // this.alertService.clear();
        this.userService.submitNewForgotPasswordRequest(this.f.email.value)
            .pipe(first())
            .pipe(finalize(() => this.loading = false))
            .subscribe(data => {
                console.log(data);

                if (data.successful) {
                    this.errorMessage = '';
                    this.successMessage = 'Confira seu email pra continuar o processo';
                } else {
                    this.errorMessage = 'Esse email não parece certo, tem certeza?';
                    this.successMessage = '';
                }
            });

        // this.accountService.forgotPassword(this.f.email.value)
        //     .pipe(first())
        //     .pipe(finalize(() => this.loading = false))
        //     .subscribe({
        //         next: () => this.alertService.success('Please check your email for password reset instructions'),
        //         error: error => this.alertService.error(error)
        //     });
    }

}
