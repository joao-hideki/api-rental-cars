interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUtc(date: Date): string;
  currentDate(): Date;
  currentDateAdd24Hours();
}

export {IDateProvider};