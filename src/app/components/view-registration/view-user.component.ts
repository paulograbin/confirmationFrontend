import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserInterface} from '../../model/userModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-view-registration',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

    user: UserInterface;
    userForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            id: [{value: '', disabled: true}, [Validators.required]],
            username: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            master: ['', [Validators.required]],
            active: ['', [Validators.required]],
            lastLogin: [{value: '', disabled: true}, [Validators.required]],
            creationDate: [{value: '', disabled: true}, [Validators.required]],
            modificationDate: [{value: '', disabled: true}, [Validators.required]],
            inactivatedIn: [{value: '', disabled: true}, [Validators.required]],
        });

        this.route.data.subscribe(
            data => {
                this.user = data.resolvedUser;
                console.log('resolved data', data);
                console.log('resolved user', this.user);

                this.displayUser();
            },
            err => console.error(err),
            () => {
                console.log(`user ${this.user.id} loaded completely`);
            }
        );
    }

    private displayUser() {
        this.userForm.patchValue({
            id: this.user.id,
            username: this.user.username,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            master: this.user.master,
            active: this.user.active,
            lastLogin: this.user.lastLogin,
            creationDate: this.user.creationDate,
            modificationDate: this.user.modificationDate,
            inactivatedIn: this.user.inactivatedIn,
        });
    }

    isValid(): boolean {
        return this.userForm.dirty;
    }

    saveUser() {
        const updateUserForAdminRequest = {
            id: this.user.id,
            username: this.userForm.get('username').value,
            email: this.userForm.get('email').value,
            firstName: this.userForm.get('firstName').value,
            lastName: this.userForm.get('lastName').value,
            active: this.userForm.get('active').value,
            master: this.userForm.get('master').value
        };

        this.userService.updateUserForAdmin(this.user.id, updateUserForAdminRequest)
            .subscribe(
                data => {
                    this.user = data;
                    this.displayUser();
                }
            );
    }

    deleteUser() {
        this.userService.inactivateUser(this.user.id).subscribe(
            data => {
                this.user = data;
                this.displayUser();
            },
            error => {
                console.log('Error deleting user');
            }
        );
    }
}


