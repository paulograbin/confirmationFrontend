import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users;

  constructor(private bikeService: BikeService) { }

  ngOnInit() {
    this.getBikes();
  }

  getBikes() {
    this.bikeService.getBikes().subscribe(
      data => { this.users = data; },
        err => console.error(err),
        () => console.log('bikes loaded')
    );
  }
}
