import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-define-new-password',
    templateUrl: './define-new-password.component.html',
    styleUrls: ['./define-new-password.component.css']
})
export class DefineNewPasswordComponent implements OnInit {

    requestCode = '';

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(
            data => {
                console.log('data', data);
                console.log('requestCode', data.passwordRequestCode.requestCode);
                this.requestCode = data.passwordRequestCode.requestCode;

                console.log('passwordRequest', this.requestCode);
            }
        );
    }

}
