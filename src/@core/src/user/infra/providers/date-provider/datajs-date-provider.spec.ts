// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
import DayjsDateProvider from "./dayjs-date-provider";

// dayjs.extend(utc);

describe('DayjsDateProvider', () => {
  let dateProvider;

  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
  });

  describe('dateNow', () => {
    it('should return the current date', () => {
      const currentDate = new Date();
      const result = dateProvider.dateNow();
      expect(result.getTime() - currentDate.getTime()).toBeLessThanOrEqual(100);
    });
  });

  describe('addDays', () => {
    it('should return a new date with added days', () => {
      const currentDate = new Date();
      const daysToAdd = 5;
      const expectedResult = new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

      const result = dateProvider.addDays(daysToAdd);
      expect(result.getTime()).toEqual(expectedResult.getTime());
    });
  });

  describe('addHours', () => {
    it('should return a new date with added hours', () => {
      const currentDate = new Date();
      const hoursToAdd = 3;
      const expectedResult = new Date(currentDate.getTime() + hoursToAdd * 60 * 60 * 1000);

      const result = dateProvider.addHours(hoursToAdd);
      expect(result.getTime()).toEqual(expectedResult.getTime());
    });
  });

  describe('compareIfBefore', () => {
    it('should return true when start_date is before end_date', () => {
      const start_date = new Date('2023-07-15T12:00:00Z');
      const end_date = new Date('2023-07-25T12:00:00Z');

      const result = dateProvider.compareIfBefore(start_date, end_date);
      expect(result).toBe(true);
    });

    it('should return false when start_date is after end_date', () => {
      const start_date = new Date('2023-07-25T12:00:00Z');
      const end_date = new Date('2023-07-15T12:00:00Z');

      const result = dateProvider.compareIfBefore(start_date, end_date);
      expect(result).toBe(false);
    });
  });
});