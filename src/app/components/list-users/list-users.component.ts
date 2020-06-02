import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserInterface} from '../../model/userModel';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

    users: UserInterface[];

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                console.log(data.loggedUser.chapter[0].id);
            }
        );

        this.fetchAndDisplayUsers();
    }

  fetchAndDisplayUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        // console.log(data);
        this.users = data;
      },
      err => console.error(err),
      () => console.log('user loading complete')
    );
  }

  inactivate(id: number) {
    console.log('here we go inactivate this asshole', id);

    this.userService.inactivateUser(id).subscribe(
      data => {
        console.log(data);
        this.fetchAndDisplayUsers();
      }
    );
  }

  activate(id: number) {
    console.log('here we go ACTIVATE this asshole', id);

    this.userService.activate(id).subscribe(
        data => {
          console.log(data);
          this.fetchAndDisplayUsers();
        }
    );
  }
}
