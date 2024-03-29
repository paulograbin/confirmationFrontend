import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserInterface} from '../model/userModel';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    loggedUser: UserInterface;

    constructor(public authService: AuthService,
                private userService: UserService) {}

    ngOnInit() {
        this.userService.fetchDetailsAboutLoggedUser()
            .subscribe(
                data => {
                    // console.log('logged user', data);
                    this.loggedUser = data;
                },
            );
    }
}
