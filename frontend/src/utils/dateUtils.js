import { format, startOfWeek, addDays, isSameWeek } from "date-fns";

// Groups progress entries into a week based on the selected date
export function getWeeklyData(entries, selectedDate = new Date()) {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(weekStart, i)
  );

  return weekDays.map((date) => {
    const dayLabel = format(date, "EEE");
    const entry = entries.find((e) => isSameWeek(new Date(e.date), date, { weekStartsOn: 1 }) && format(new Date(e.date), "EEE") === dayLabel);
    return {
      day: dayLabel,
      progress: entry ? entry.progress : 0,
    };
  });
}
