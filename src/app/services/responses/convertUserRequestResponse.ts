
export interface ConvertUserRequestResponse {

    requestNumber: string;
    successful: boolean;
    username: string;
    email: string;

    errorMessage: string;
    requestNotFound: boolean;
    expired: boolean;
    usernameNotAvailable: boolean;
}
