import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(private formBuilder: FormBuilder) {
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
            return;
        }

        this.loading = true;
        console.log('value ', this.f.email.value);

        // this.loading = true;
        // this.alertService.clear();
        // this.accountService.forgotPassword(this.f.email.value)
        //     .pipe(first())
        //     .pipe(finalize(() => this.loading = false))
        //     .subscribe({
        //         next: () => this.alertService.success('Please check your email for password reset instructions'),
        //         error: error => this.alertService.error(error)
        //     });
    }

}
