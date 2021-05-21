export interface PasswordRequest {

    id: string;
    code: string;
    email: string;
    creationDate: Date;
    expirationDate: Date;
}

export class PasswordRequestModel implements PasswordRequest {
    constructor(
        public code: string
    ) {
    }

    creationDate: Date;
    email: string;
    expirationDate: Date;
    id: string;
}
