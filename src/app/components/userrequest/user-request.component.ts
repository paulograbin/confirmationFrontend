import {Component, OnInit} from '@angular/core';
import {UserRequestService} from '../../services/user-request.service';
import {ActivatedRoute, Router} from '@angular/router';
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
    successMessage = '';

    constructor(private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private router: Router,
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

        this.route.data.subscribe(
            data => {
                console.log('resolved data', this.userRequest);
                this.userRequest = data.resolvedRequest;

                if (this.userRequest.successful === false) {
                    this.errorMessage = data.resolvedRequest.errorMessage;
                }

                this.displayRequest();
            },
            err => {
                console.log('Error');
                console.log(err);
            },
            () => {
                console.log(`user ${this.userRequest.requestId} loaded completely`);
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

        this.userRequestService.convertRequestToUser(this.userRequest.requestId, convertUserRequest)
            .subscribe(
                data => {
                    console.log(data);

                    if (!data.successful) {
                        this.successMessage = '';
                        this.errorMessage = data.errorMessage;
                    } else {
                        this.errorMessage = '';
                        this.successMessage = 'Usuário criado com sucesso, redirecionando para o login...';

                        setTimeout(() => {
                            this.router.navigate(['/']);
                        }, 3000);
                    }
                }, error => {
                    console.log(error);
                    this.errorMessage = error.errorMessage;
                }
            );
    }
}
