import {Chapter} from './chapterModel';

export interface UserInterface {

    id: number;
    firstName: string;
    lastName: string;
    username: string;
    chapter: Chapter;
    email: string;
    master: boolean;
    active: boolean;
    creationDate: Date;
    modificationDate: Date;
    inactivatedIn: Date;
}
