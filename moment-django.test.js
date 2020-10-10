const moment = require('./moment-django');

beforeEach(function () {
  date1 = moment('2009-06-05T21:34:00'); // Friday, June
  date2 = moment.utc('2017-02-16T10:50:20Z'); // Thursday, February
  date3 = moment.utc('2017-02-15T10:00:00Z'); // Wednesday, February
  date4 = moment('2009-06-05T21:34:00.123456'); // Friday, June
  date5 = moment('2009-06-05T05:34:00.123456'); // Friday, June
  dateJan = moment('2017-01-01');
  dateFeb = moment('2017-02-01');
  dateMar = moment('2017-03-01');
  dateApr = moment('2017-04-01');
  dateMay = moment('2017-05-01');
  dateJun = moment('2017-06-01');
  dateJul = moment('2017-07-01');
  dateAug = moment('2017-08-01');
  dateSep = moment('2017-09-01');
  dateOct = moment('2017-10-01');
  dateNov = moment('2017-11-01');
  dateDec = moment('2017-12-01');
  dateLeapYear = moment('2004-12-01');
  dateDjangoExample = moment('2008-01-09T16:00:00');
  dateIsoWeek1 = moment('2005-01-01')
  dateIsoWeek2 = moment('2006-01-01')
});

// a
test('formats \'a.m.\' or \'p.m.\'', () => {
  expect(date1.django('a')).toEqual('p.m.');
  expect(date2.django('a')).toEqual('a.m.');
});

// A
test('formats \'AM\' or \'\'', () => {
  expect(date1.django('A')).toEqual('PM');
  expect(date2.django('A')).toEqual('AM');
});

// b
test('formats month, textual, 3 letters, lowercase', () => {
  expect(date1.django('b')).toEqual('Jun');
});

// c
test('formats as ISO 8601 string', () => {
  expect(date1.django('c')).toEqual('2009-06-05T21:34:00.000000+00:00');
});

// d
test('formats day of the month, 2 digits with leading zeros', () => {
  expect(date1.django('d')).toEqual('05');
});

// D
test('formats day of the week, 3 letters', () => {
  expect(date1.django('D')).toEqual('Fri');
});

// e
test('formats timezone name', () => {
  expect(date1.django('e')).toEqual('+0000');
});

// E
test('formats month in current locale', () => {
  expect(date1.django('E')).toEqual('June');
});

// f
test('formats time, in 12-hour hours and minutes, with minutes left off if they’re zero', () => {
  expect(date1.django('f')).toEqual('9:34');
  expect(date3.django('f')).toEqual('10');
});

// F
test('formats month, textual, long', () => {
  expect(date1.django('F')).toEqual('June');
});

// g
test('formats hours without leading zeros, 12 hour format', () => {
  expect(date1.django('g')).toEqual('9');
  expect(date5.django('g')).toEqual('5');
});

// G
test('formats hours without leading zeros, 24 hour format', () => {
  expect(date1.django('G')).toEqual('21');
  expect(date5.django('G')).toEqual('5');
});
//
// h
test('formats hours, 12 hour format', () => {
  expect(date1.django('h')).toEqual('09');
});

// H
test('formats hours, 24 hour format', () => {
  expect(date1.django('H')).toEqual('21');
});

// i
test('formats minutes', () => {
  expect(date4.django('i')).toEqual('34');
});
//
// // I
// test('formats boolean is daylight savings time', () => {
//   expect(dateIsDST.django('I')).toEqual('1');
//   expect(dateNotDST.django('I')).toEqual('0');
// });

// j
test('formats day of the month without leading zeros', () => {
  expect(date1.django('j')).toEqual('5');
  expect(date3.django('j')).toEqual('15');
});

// l
test('formats day of the week, textual, long.', () => {
  expect(date1.django('l')).toEqual('Friday');
});

// L
test('formats boolean for whether it\'s a leap year', () => {
  expect(date1.django('L')).toEqual(false);
  expect(dateLeapYear.django('L')).toEqual(true);
});

// m
test('formats month, 2 digits with leading zeros.', () => {
  expect(dateJan.django('m')).toEqual('01');
  expect(dateFeb.django('m')).toEqual('02');
  expect(dateMar.django('m')).toEqual('03');
  expect(dateApr.django('m')).toEqual('04');
  expect(dateMay.django('m')).toEqual('05');
  expect(dateJun.django('m')).toEqual('06');
  expect(dateJul.django('m')).toEqual('07');
  expect(dateAug.django('m')).toEqual('08');
  expect(dateSep.django('m')).toEqual('09');
  expect(dateOct.django('m')).toEqual('10');
  expect(dateNov.django('m')).toEqual('11');
  expect(dateDec.django('m')).toEqual('12');
});

// M
test('formats month, textual, 3 letters', () => {
  expect(dateJan.django('M')).toEqual('Jan');
  expect(dateFeb.django('M')).toEqual('Feb');
  expect(dateMar.django('M')).toEqual('Mar');
  expect(dateApr.django('M')).toEqual('Apr');
  expect(dateMay.django('M')).toEqual('May');
  expect(dateJun.django('M')).toEqual('Jun');
  expect(dateJul.django('M')).toEqual('Jul');
  expect(dateAug.django('M')).toEqual('Aug');
  expect(dateSep.django('M')).toEqual('Sep');
  expect(dateOct.django('M')).toEqual('Oct');
  expect(dateNov.django('M')).toEqual('Nov');
  expect(dateDec.django('M')).toEqual('Dec');
});

// n
test('formats month without leading zeros.', () => {
  expect(dateJan.django('n')).toEqual('1');
  expect(dateFeb.django('n')).toEqual('2');
  expect(dateMar.django('n')).toEqual('3');
  expect(dateApr.django('n')).toEqual('4');
  expect(dateMay.django('n')).toEqual('5');
  expect(dateJun.django('n')).toEqual('6');
  expect(dateJul.django('n')).toEqual('7');
  expect(dateAug.django('n')).toEqual('8');
  expect(dateSep.django('n')).toEqual('9');
  expect(dateOct.django('n')).toEqual('10');
  expect(dateNov.django('n')).toEqual('11');
  expect(dateDec.django('n')).toEqual('12');
});

// N
test('formats AP style abbreviated month', () => {
  expect(dateJan.django('N')).toEqual('Jan.');
  expect(dateFeb.django('N')).toEqual('Feb.');
  expect(dateMar.django('N')).toEqual('March');
  expect(dateApr.django('N')).toEqual('April');
  expect(dateMay.django('N')).toEqual('May');
  expect(dateJun.django('N')).toEqual('June');
  expect(dateJul.django('N')).toEqual('July');
  expect(dateAug.django('N')).toEqual('Aug.');
  expect(dateSep.django('N')).toEqual('Sep.');
  expect(dateOct.django('N')).toEqual('Oct.');
  expect(dateNov.django('N')).toEqual('Nov.');
  expect(dateDec.django('N')).toEqual('Dec.');
});

// o
test('formats ISO-8601 week-numbering year, corresponding to the ISO-8601 week number (W) which uses leap weeks.', () => {
  console.log(dateIsoWeek1.format('Y'))
  expect(dateIsoWeek1.django('o')).toEqual('2005');
  expect(dateIsoWeek2.django('o')).toEqual('2006');
});

// O
test('formats difference to Greenwich time in hours.	', () => {
  expect(date3.django('O')).toEqual('+0000');
});

// P
test('formats time, in 12-hour hours, minutes and a.m./p.m., with minutes left off if they’re zero and the special-case strings ‘midnight’ and ‘noon’ if appropriate.', () => {
  expect(date1.django('P')).toEqual('9:34 p.m.');
  expect(dateDjangoExample.django('P')).toEqual('4 p.m.');
  expect(dateDec.django('P')).toEqual('midnight');
});

// r 
test('formats RFC 5322 formatted date.', () => {
  expect(date1.django('r')).toEqual('Fri, 5 Jun 2009 21:34:00 +0000');
});

// s
test('formats seconds, two digits with leading zeros', () => {
  expect(date2.django('s')).toEqual('20');
});

// S
test('formats english ordinal suffix for the day of the month, 2 characters; i.e. st, nd, rd or th', () => {
  expect(date1.django('S')).toEqual('th');
});


// t
test('formats days in given month', () => {
  expect(date1.django('t')).toEqual('30');
  expect(dateJan.django('t')).toEqual('31');
});


// T
test('formats timezone of this machine (deprecated since moment 1.6.0)', () => {
  expect(date1.django('T')).toEqual('');
});

// u
// momentjs only deals with milliseconds
test('formats microseconds', () => {
  expect(date4.django('u')).toEqual('123000');
});

// w
test('formats day of the week, digits without leading zeros', () => {
  expect(date1.django('w')).toEqual('5');
});

// W
test('formats ISO-8601 week number of year, with weeks starting on Monday', () => {
  expect(date1.django('W')).toEqual('23');
});

// y
test('formats year, 2 digits', () => {
  expect(date1.django('y')).toEqual('09');
});

// Y
test('formats year, 4 digits', () => {
  expect(date1.django('Y')).toEqual('2009');
});

// z
test('formats day of year', () => {
  expect(date1.django('z')).toEqual('156');
  expect(dateJan.django('z')).toEqual('1');
});

// Test some default Django date formatting strings

// DATE_FORMAT: N j, Y
test('formats DATE_FORMAT correctly', () => {
  expect(date1.django('N j, Y')).toEqual('June 5, 2009');
});

test('formats django example correctly', () => {
  expect(date1.django("D d M Y")).toEqual('Fri 05 Jun 2009')
  expect(dateDjangoExample.django("D d M Y")).toEqual('Wed 09 Jan 2008')
})

test('formats django DATETIME_FORMAT correctly', () => {
  expect(date1.django('N j, Y, P')).toEqual('June 5, 2009, 9:34 p.m.')
  expect(dateDjangoExample.django('N j, Y, P')).toEqual('Jan. 9, 2008, 4 p.m.')
})

test('formats django SHORT_DATETIME_FORMAT correctly', () => {
  expect(date1.django('m/d/Y P')).toEqual('06/05/2009 9:34 p.m.')
  expect(dateDjangoExample.django('m/d/Y P')).toEqual('01/09/2008 4 p.m.')
})
