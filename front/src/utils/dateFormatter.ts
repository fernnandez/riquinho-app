import { DateTime } from 'luxon';

export function DateFormatter(date: string) {
  return DateTime.fromJSDate(new Date(date))
    .toUTC()
    .toFormat('dd/MM/yyyy', { locale: 'pt-br' });
}
