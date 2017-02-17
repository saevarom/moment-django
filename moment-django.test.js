const moment = require('./moment-django');

beforeEach(function () {
  date1 = moment('2009-06-05T21:34:00'); // Friday, June
  date2 = moment.utc('2017-02-16T10:50:20Z'); // Thursday, February
  date3 = moment.utc('2017-02-15T10:00:00Z'); // Wednesday, February
  date4 = moment('2009-06-05T21:34:00.123456'); // Friday, June
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
//
// // F
// test('formats ', () => {
//   expect(date1.django('F')).toEqual('');
// });
//
// // g
// test('formats ', () => {
//   expect(date1.django('g')).toEqual('');
// });
//
// // G
// test('formats ', () => {
//   expect(date1.django('G')).toEqual('');
// });
//
// // h
// test('formats ', () => {
//   expect(date1.django('h')).toEqual('');
// });
//
// // H
// test('formats ', () => {
//   expect(date1.django('H')).toEqual('');
// });
//
// // i
// test('formats ', () => {
//   expect(date1.django('i')).toEqual('');
// });
//
// // I
// test('formats ', () => {
//   expect(date1.django('I')).toEqual('');
// });
//
// // j
// test('formats ', () => {
//   expect(date1.django('j')).toEqual('');
// });
//
// // l
// test('formats ', () => {
//   expect(date1.django('l')).toEqual('');
// });
//
// // L
// test('formats ', () => {
//   expect(date1.django('L')).toEqual('');
// });
//
// // m
// test('formats ', () => {
//   expect(date1.django('m')).toEqual('');
// });

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

// // n
// test('formats ', () => {
//   expect(date1.django('n')).toEqual('');
// });

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

// // o
// test('formats ', () => {
//   expect(date1.django('o')).toEqual('');
// });
//
// // O
// test('formats ', () => {
//   expect(date1.django('O')).toEqual('');
// });
//
// // P
// test('formats ', () => {
//   expect(date1.django('P')).toEqual('');
// });
//
// // r
// test('formats ', () => {
//   expect(date1.django('r')).toEqual('');
// });

// s
test('formats seconds, two digits with leading zeros', () => {
  expect(date2.django('s')).toEqual('20');
});

// // S
// test('formats ', () => {
//   expect(date1.django('S')).toEqual('');
// });
//
// // t
// test('formats ', () => {
//   expect(date1.django('t')).toEqual('');
// });
//
// // T
// test('formats ', () => {
//   expect(date1.django('T')).toEqual('');
// });

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

// Test some default Django date formatting strings

// DATE_FORMAT: N j, Y
test('formats DATE_FORMAT correctly', () => {
  expect(date1.django('N j, Y')).toEqual('June 5, 2009');
});
