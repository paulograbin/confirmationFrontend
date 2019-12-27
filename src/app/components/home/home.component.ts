import { Component, OnInit } from '@angular/core';
import { BikeService} from '../../services/bike.service';
import {FormGroup, FormControl, Validators, FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bikeform: FormGroup;
  validMessage: string = '';

  constructor(private bikeService: BikeService,
              private authService: AuthService) { }

  ngOnInit() {
    this.bikeform = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      contact: new FormControl()
    });
  }

  submitRegistration() {
    if (this.bikeform.valid) {
      this.validMessage = 'Your bike registration has been submited. Thanks';
      this.bikeService.createBikeRegistration(this.bikeform.value).subscribe(
        data => {
          this.bikeform.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      );
    } else {
      this.validMessage = 'Please fill out the form before submitting';
    }
  }

}
