export interface EventItem {
  id: string;
  title: string;
  date: Date;
  dateLabel: string;
  shortDateLabel: string;
  time: string;
  location: string;
  desc: string;
  tag: string;
}

const fullFmt = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const shortFmt = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
});

export function generateRecurringEvents(): EventItem[] {
  const events: EventItem[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date('2026-12-31');

  const cur = new Date(today);
  while (cur <= end) {
    const day = cur.getDay();
    const iso = cur.toISOString().slice(0, 10);
    const dateLabel = fullFmt.format(cur);
    const shortDateLabel = shortFmt.format(cur);

    if (day === 0) {
      events.push({
        id: `sunday-${iso}`,
        title: 'Sunday Service',
        date: new Date(cur),
        dateLabel,
        shortDateLabel,
        time: '8:00 AM · 11:00 AM · 7:00 PM',
        location: 'Aenon Church, Tarnaka',
        desc: 'Join us for worship, the Word, and fellowship. Three services to choose from — morning and evening.',
        tag: 'Weekly',
      });
    } else if (day === 3) {
      events.push({
        id: `wednesday-${iso}`,
        title: 'Mid-week Bible Study',
        date: new Date(cur),
        dateLabel,
        shortDateLabel,
        time: '7:00 PM',
        location: 'Aenon Church, Tarnaka',
        desc: "Dive deeper into God's Word with our mid-week Bible study — open to all.",
        tag: 'Weekly',
      });
    } else if (day === 5) {
      events.push({
        id: `friday-${iso}`,
        title: 'Friday Prayer',
        date: new Date(cur),
        dateLabel,
        shortDateLabel,
        time: '11:00 AM',
        location: 'Aenon Church, Tarnaka',
        desc: 'Start your Friday in prayer. All are welcome to join us as we seek God together.',
        tag: 'Weekly',
      });
    } else if (day === 6) {
      events.push({
        id: `saturday-${iso}`,
        title: 'Youth Meeting',
        date: new Date(cur),
        dateLabel,
        shortDateLabel,
        time: '7:00 PM',
        location: 'Aenon Church, Tarnaka',
        desc: 'A weekly gathering for young people — worship, the Word, and community.',
        tag: 'Weekly',
      });
    }

    cur.setDate(cur.getDate() + 1);
  }

  const upcomingSpecialEvents = specialEvents.filter((event) => event.date >= today);

  return [...events, ...upcomingSpecialEvents].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
}

// One-off events that don't fit the weekly recurring pattern above.
const specialEvents: EventItem[] = [
  {
    id: 'grace-festival-2026',
    title: 'Grace Festival 2026',
    date: new Date('2026-11-12'),
    dateLabel: 'November 12–15, 2026',
    shortDateLabel: 'Nov 12–15',
    time: '6:00 PM daily',
    location: 'A.N.R. Gardens, Nacharam, Hyderabad',
    desc: 'Four nights of worship and the Word with Rev. R. William Cary and other anointed guest speakers. All are welcome.',
    tag: 'Festival',
  },
];

export function getUpcomingEvents(count: number): EventItem[] {
  return generateRecurringEvents().slice(0, count);
}

export const MAPS_URL = 'https://maps.app.goo.gl/K4tkmhmh6Sg5xbhW7';
