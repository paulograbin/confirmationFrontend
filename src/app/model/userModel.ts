export interface UserInterface {

    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    master: boolean;
    creationDate: Date;
    modificationDate: Date;
    inactivatedIn: Date;
}

export class UserModel implements UserInterface {

    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public username: string,
        public email: string,
        public master: boolean,
        public creationDate: Date,
        public modificationDate: Date,
        public inactivatedIn: Date) {
    }
}
