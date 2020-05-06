import {EventModel} from './eventModel';
import {UserInterface} from './userModel';

export class ParticipationModel {
  constructor(
    public id: number,
    public user: UserInterface,
    public event: EventModel,
    public status: string,
    public invitationDate: Date,
    public confirmationDate: Date
    ) { }
}
