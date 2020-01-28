import {UserModel} from './userModel';

export class ParticipationModel {
  constructor(
    public id: number,
    public user: UserModel,
    public status: string,
    public invitationDate: Date,
    public confirmationDate: Date
    ) { }
}
