import {ParticipationModel} from './participationModel';

export class EventModel {
    constructor(
        public participants: ParticipationModel[],
        public id: string,
        public title: string,
        public date: Date,
        public creationDate: Date,
        public description: string) {
    }
}
