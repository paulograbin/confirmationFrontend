import {UserModel} from './userModel';
import {EventModel} from './eventModel';

export class ParticipationModel {
  constructor(
    public id: number,
    public user: UserModel,
    public event: EventModel,
    public status: string,
    public invitationDate: Date,
    public confirmationDate: Date
    ) { }
}
