export interface UserRequestInterface {

    id: string;
    code: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    userId: string;

    chapterId: string;
    chapterName: string;

    createdById: string;
    createdByUsername: string;

    creationDate: Date;
    expirationDate: Date;
    conversionDate: Date;

    successful: boolean;

}
