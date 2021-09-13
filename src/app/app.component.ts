import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {UserInterface} from './model/userModel';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    // user: UserInterface;

    constructor(private userService: UserService) {
        // userService.fetchDetailsAboutLoggedUser()
        //     .subscribe(data => {
        //         console.log(data);
        //         this.user = data;
        //     });
    }
}
