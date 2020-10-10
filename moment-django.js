(function () {
  var moment, replacements, callables;

  if (typeof require !== "undefined" && require !== null) {
    moment = require('moment');
  } else {
    moment = this.moment;
  }

  var a = (_m) => {
    return (_m.hour() > 12) ? '[p.m.]' : '[a.m.]';
  }

  var f = (_m) => {
    if (_m.minutes() == 0)
      return 'h'
    else
      return 'h:mm'
  }

  var P = (_m) => {
    var minutes = _m.minutes()
    var hours = _m.hours()
    if (minutes === 0 && hours === 0) {
      return "[midnight]"
    } 
    if (minutes === 0 && hours === 12) {
      return "[noon]"
    }
    return `${f(_m)} ${a(_m)}`

  }

  var N = (_m) => {
    if ([2, 3, 4, 5, 6].indexOf(_m.month()) > -1)
      return 'MMMM'
    else
      return 'MMM[.]'
  }

  var S = (_m) => {
    var day = _m.day()
    if ([11, 12, 13].includes(day)) {
      return '[th]'
    }
    var last = day % 10
    if (last === 1)
        return '[st]'
    if (last === 2)
        return '[nd]'
    if (last === 3)
        return '[rd]'
    return '[th]'
  }

  replacements = {
    // 	'a.m.' or 'p.m.' (Note that this is slightly different than PHP’s
    // output, because this includes periods to match Associated Press style.)
    a: a,
    // 'AM' or 'PM'.
    A: 'A',
    // Month, textual, 3 letters, lowercase.
    // NOTE: this will probably never work since it involves setting the
    // formatted string to lowercase, after moment has formatted it.
    b: 'MMM',
    // ISO 8601 format. (Note: unlike others formatters, such as “Z”, “O” or
    // “r”, the “c” formatter will not add timezone offset if value is a naive
    // datetime
    c: 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ',
    // Day of the month, 2 digits with leading zeros.
    d: 'DD',
    // Day of the week, textual, 3 letters.
    D: 'ddd',
    // Timezone name. Could be in any format, or might return an empty string,
    // depending on the datetime.
    e: 'ZZ',
    // Month, locale specific alternative representation usually used for long
    // date representation.
    E: 'MMMM',
    // Time, in 12-hour hours and minutes, with minutes left off if they’re
    // zero. Proprietary extension.
    f: f,
    // Month, textual, long.
    F: 'MMMM',
    // Hour, 12-hour format without leading zeros.
    g: 'h',
    // Hour, 24-hour format without leading zeros.
    G: 'H',
    // Hour, 12-hour format.
    h: 'hh',
    // Hour, 24-hour format.
    H: 'HH',
    // Minutes
    i: 'mm',
    // Day of the month without leading zeros.
    j: 'D',
    // Day of the week, textual, long.
    l: 'dddd',
    // Month, 2 digits with leading zeros.
    m: 'MM',
    // Month, textual, 3 letters.
    M: 'MMM',
    // Month without leading zeros.
    n: 'M',
    // Month abbreviation in Associated Press style. Proprietary extension.
    N: N,
    // ISO-8601 week-numbering year, corresponding to the ISO-8601 week number
    // (W) which uses leap weeks. See Y for the more common year format.
    o: 'Y',
    // Difference to Greenwich time in hours.
    O: 'ZZ',
    // Time, in 12-hour hours, minutes and ‘a.m.’/’p.m.’, with minutes left off
    // if they’re zero and the special-case strings ‘midnight’ and ‘noon’ if
    // appropriate. Proprietary extension
    P: P,
    // RFC 5322 formatted date (https://tools.ietf.org/html/rfc5322.html).
    r: 'ddd[,] D MMM YYYY HH[:]mm:ss ZZ',
    // Seconds, 2 digits with leading zeros.
    s: 'ss',
    // English ordinal suffix for day of the month, 2 characters.
    S: S,
    // Microseconds.
    u: 'SSSSSS',
    // Seconds since the Unix Epoch (January 1 1970 00:00:00 UTC).
    U: '',
    // Day of the week, digits without leading zeros.
    w: 'e',
    // ISO-8601 week number of year, with weeks starting on Monday.
    W: 'W',
    // Year, 2 digits.
    y: 'YY',
    // Year, 4 digits.
    Y: 'YYYY',
    // Day of the year.
    z: 'DDD',
    // Time zone offset in seconds. The offset for timezones west of UTC is
    // always negative, and for those east of UTC is always positive.
    Z: '',

  };

  callables = {
    // Daylight Savings Time, whether it’s in effect or not.
    I: function(_m) {
      return _m.isDST() ? '1' : '0'
    },
    // Boolean for whether it’s a leap year.
    L: function(_m) {
      return _m.isLeapYear()
    },
    // Time zone of this machine.
    T: function(_m) {
      return ""
    },
    // Number of days in the given month.
    t: function(_m) {
      return `${_m.daysInMonth()}`
    },
  }

  moment.fn.django = function (format) {
    var momentFormat = format, value, _m = this;
    momentFormat = format.replace(/(\w+)/g, function (literal) { return '[' + literal + ']'; });

    if (Object.keys(callables).includes(format)) {
      return callables[format](this)
    }

    Object.keys(replacements).forEach(function (key) {
      if (replacements[key] instanceof Function) {
        value  = replacements[key](_m);
        momentFormat = momentFormat.replace("["+key+"]", value);
      } else {
        value = replacements[key];
        momentFormat = momentFormat.replace("["+key+"]", value);
      }
    });
    return this.format(momentFormat);
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = moment;
  } else {
    this.moment = moment;
  }
}).call(this);
