import {Component, OnInit} from '@angular/core';
import {UserRequestService} from '../../services/user-request.service';
import {ActivatedRoute} from '@angular/router';
import {UserRequestInterface} from '../../model/userRequestInterface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-userrequest',
    templateUrl: './user-request.component.html',
    styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent implements OnInit {

    userRequest: UserRequestInterface;

    requestForm: FormGroup;
    errorMessage = '';

    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private userRequestService: UserRequestService) {
    }

    ngOnInit(): void {
        this.requestForm = this.formBuilder.group({
                firstName: ['', [Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(250)]],
                lastName: ['', [Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(250)]],
                username: ['', [Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(250)]],
                password: ['', [Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(250)]],
            }
        );

        console.log(`request number ${this.route.snapshot.params.requestNumber}`);

        const requestNumber = this.route.snapshot.params.requestNumber;

        this.userRequestService.getUserRequest(requestNumber).subscribe(
            data => {
                console.log(data);
                this.userRequest = data;

                this.displayRequest();
            }, error => {
                this.userRequest = error;

                console.log(`Request ${requestNumber} not found`);
                console.log(error);
                console.log(error.error.errorMessage);
                this.errorMessage = error.error.errorMessage;
            }
        );
    }

    private displayRequest() {
        this.requestForm.patchValue({
            firstName: this.userRequest.firstName,
            lastName: this.userRequest.lastName,
            username: this.userRequest.username,
            password: '',
        });
    }

    isValid() {
        return this.requestForm.valid;
    }

    convertUser() {
        const convertUserRequest = {
            requestNumber: this.userRequest.requestId,
            firstName: this.requestForm.get('firstName').value,
            lastName: this.requestForm.get('lastName').value,
            username: this.requestForm.get('username').value,
            password: this.requestForm.get('password').value
        };

        console.log(convertUserRequest);

        this.userRequestService.convertRequestToUser(this.userRequest.requestId, convertUserRequest).subscribe(
            data => {
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
    }
}
