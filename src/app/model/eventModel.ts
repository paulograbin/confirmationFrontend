import {ParticipationModel} from './participationModel';
import {Chapter} from './chapterModel';


export interface EventInterface {

    participants: ParticipationModel[];
    id: number;
    title: string;
    description: string;
    address: string;
    published: boolean;
    date: Date;
    time: Date;
    creatorId: number;
    creationDate: Date;
    chapter: Chapter;

}

export class EventModel implements EventInterface {
    constructor(
        public participants: ParticipationModel[],
        public id: number,
        public title: string,
        public description: string,
        public address: string,
        public published: boolean,
        public date: Date,
        public time: Date,
        public chapter: Chapter,
        public creatorId: number,
        public creationDate: Date) {
    }
}

export interface EventResolved {
    event: EventInterface;
    error?: any;
}
