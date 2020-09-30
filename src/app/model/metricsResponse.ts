export interface MetricsResponse {

    totalUsers: number;
    activeUsers: number;
    usersThatAlreadyLoggedIn: number;

    totalEvents: number;
    publishedEvents: number;
    futureEvents: number;

    totalChapters: number;

    totalUserRequests: number;
    convertedUserRequest: number;

}
