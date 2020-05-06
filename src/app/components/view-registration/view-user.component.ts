import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserInterface} from '../../model/userModel';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  user: UserInterface;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.getUserDetails(this.route.snapshot.params.id);
  }

  getUserDetails(id: number) {
    this.userService.getUser(id).subscribe(
      data => {
        console.log(data);
        this.user = data;
      },
      err => console.error(err),
      () => console.log(`user ${id} laded`)
    );
  }
}


