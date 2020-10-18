import {EventInterface} from './eventModel';


export interface ViewEventResponse {

    eventDetails: EventInterface;
    successful: boolean;
    errorMessage: string;
    notAllowed: boolean;
    invalidUser: boolean;
    invalidEvent: boolean;
    canChange: boolean;
    creating: boolean;
    isInThePast: boolean;

}
