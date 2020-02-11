export class DateFormatter {

    dayName = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    monName = ['janeiro', 'fevereiro', 'março', 'abril', 'Maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];


    public formatDate(date: Date): string {
        console.log(`Formating ${date}`);

        return this.dayName[date.getDay()] + ', ' + date.getDate() + ' de ' + this.monName[date.getMonth()] + ' de ' + date.getFullYear();
    }
}
