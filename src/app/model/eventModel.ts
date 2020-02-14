import {ParticipationModel} from './participationModel';
import {DateFormatter} from '../services/dateFormatter';


export interface EventInterface {

    participants: ParticipationModel[];
    id: number;
    title: string;
    description: string;
    address: string;
    dateTime: Date;
    translatedDateTime: string;
    creatorId: number;
    creationDate: Date;

}

export class EventModel implements EventInterface {
    constructor(
        public participants: ParticipationModel[],
        public id: number,
        public title: string,
        public description: string,
        public address: string,
        public dateTime: Date,
        public translatedDateTime: string,
        public creatorId: number,
        public creationDate: Date,
        private dateFormatter: DateFormatter) {

        this.translatedDateTime = this.dateFormatter.formatDate(new Date(dateTime));
    }

    getFormatedDate(): string {
        return this.dateFormatter.formatDate(this.dateTime);
    }
}

export interface EventResolved {
    event: EventInterface;
    error?: any;
}
