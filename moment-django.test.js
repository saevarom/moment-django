const moment = require('./moment-django');

beforeEach(function () {
  date1 = moment('2009-06-05T21:34:00'); // Friday
  date2 = moment.utc('2017-02-16T10:50:20Z'); // Thursday
  date3 = moment.utc('2017-02-15T10:00:00Z'); // Wednesday
  date4 = moment('2009-06-05T21:34:00.123456');
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
