import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username = 'plgrabin';
    password = 'aaa';
    invalidLogin = true;
    errorMessage = 'error message';
    validMessage = 'valid message';

    constructor(private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
    }

    handleLogin() {
        this.authService.login(this.username, this.password)
            .subscribe(
                data => {
                    console.log(data);
                    this.router.navigate(['events']);
                    this.invalidLogin = false;
                },
                error => {
                    console.log(error);
                    this.invalidLogin = true;
                }
            );
    }
}
