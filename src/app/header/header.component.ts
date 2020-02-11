import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserModel} from '../model/userModel';
import {UserService} from '../services/user.service';
import {UserModelInterface} from '../model/userModelInteface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser: UserModelInterface;

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.fetchDetailsAboutLoggedUser().subscribe(
        data => {
          // console.log('logged user', data);
          this.loggedUser = data;
        },
        error => console.error(error),
        () => {
          // if (this.loggedUser.master) {
          //   console.log('MC');
          // } else {
          //   console.log('Not MC');
          // }
        }
    );
  }

}
