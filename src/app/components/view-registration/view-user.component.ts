import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BikeService } from 'src/app/services/bike.service';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.css']
})
export class ViewUserComponent implements OnInit {

  user = new User('', '', '');

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


