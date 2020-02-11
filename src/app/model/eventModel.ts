import {ParticipationModel} from './participationModel';
import {DateFormatter} from '../services/dateFormatter';


export interface EventInterface {

    participants: ParticipationModel[];
    id: number;
    title: string;
    dateTime: Date;
    translatedDateTime: string;
    creatorId: number;
    creationDate: Date;
    description: string;

}

export class EventModel implements EventInterface {
    constructor(
        public participants: ParticipationModel[],
        public id: number,
        public title: string,
        public dateTime: Date,
        public translatedDateTime: string,
        public creatorId: number,
        public creationDate: Date,
        public description: string,
        private dateFormatter: DateFormatter) {

        this.translatedDateTime = this.dateFormatter.formatDate(new Date(dateTime));
    }

    getFormatedDate(): string {
        return this.dateFormatter.formatDate(this.dateTime);
    }
}

export interface EventResolved {
    eventModel: EventModel;
    error?: any;
}
