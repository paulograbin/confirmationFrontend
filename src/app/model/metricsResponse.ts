export interface MetricsResponse {

    totalUsers: number;
    activeUsers: number;
    usersThatAlreadyLoggedIn: number;

    totalEvents: number;
    publishedEvents: number;
    futureEvents: number;

    totalChapters: number;

    totalParticipations: number;
    confirmedParticipations: number;

    totalUserRequests: number;
    convertedUserRequest: number;

}
