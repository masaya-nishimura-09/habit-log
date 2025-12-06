import { differenceInCalendarDays } from "date-fns";

export function getStreak(date: string) {
  const streak = differenceInCalendarDays(new Date(), new Date(date));
  return streak;
}
