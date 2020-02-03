import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    invalidLogin = false;
    errorMessage = 'error message';

    constructor(private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            usernameOrEmail: new FormControl('plgrabin', Validators.required),
            password: new FormControl('aaa', Validators.required),
        });
    }

    handleLogin() {
        console.log('vai login com ', this.loginForm.value);

        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value)
                .subscribe(
                    data => {
                        console.log(data);
                        this.router.navigate(['events']);
                        this.invalidLogin = false;
                    },
                    error => {
                        this.invalidLogin = true;

                        if (error.status === 401 || error.status === 400) {
                            this.errorMessage = 'Dados inválidos';
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
