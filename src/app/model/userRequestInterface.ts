export interface UserRequestInterface {

    requestId: string;
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    chapterId: string;
    chapterName: string;
    creationDate: Date;
    expirationDate: Date;
    conversionDate: Date;
    successful: boolean;

}
