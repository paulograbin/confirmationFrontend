import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public users;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.fetchAndDisplayUsers();
  }

  fetchAndDisplayUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        console.log(data);
        this.users = data;
      },
      err => console.error(err),
      () => console.log('users loaded')
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
}
