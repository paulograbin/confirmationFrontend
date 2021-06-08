export interface PasswordRequest {

    successful: boolean;
    id: string;
    requestCode: string;
    email: string;
    creationDate: Date;
    expirationDate: Date;
}
