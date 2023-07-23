import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
import DateProvider from "../../../../@seedwork/application/providers/date-provider";

// dayjs.extend(utc);

export class DayjsDateProvider implements DateProvider {
  public dateNow(): Date {
    return dayjs().toDate();
  }

  public addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  public addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }

  public compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export default DayjsDateProvider;
