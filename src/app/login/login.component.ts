import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    invalidLogin = false;
    errorMessage = 'error message';

    showResetButton = true;

    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            usernameOrEmail: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.authService.logout();

        this.route.data
            .subscribe(
                data => {
                    this.showResetButton = data.features.RESET_PASSWORD_BUTTON;
                });
    }

    handleLogin() {
        this.invalidLogin = false;

        const loginData = {
            usernameOrEmail: this.loginForm.get('usernameOrEmail').value.trim(),
            password: this.loginForm.get('password').value.trim(),
        };

        if (this.loginForm.valid) {
            this.authService.login(loginData)
                .subscribe(
                    data => {
                        this.router.navigate(['/']);

                        this.invalidLogin = false;
                    },
                    error => {
                        this.invalidLogin = true;

                        if (error.status === 401 || error.status === 400) {
                            this.errorMessage = 'Senha e/ou usuários inválidos!';
                        } else {
                            this.errorMessage = 'Ops, parece que o servidor não está respondendo';
                        }
                    }
                );
        } else {
            this.invalidLogin = true;
            this.errorMessage = 'Preencha os dados!';
        }
    }
}
