(function () {
  var moment, replacements;

  if (typeof require !== "undefined" && require !== null) {
    moment = require('moment');
  } else {
    moment = this.moment;
  }

  replacements = {
    // 	'a.m.' or 'p.m.' (Note that this is slightly different than PHP’s
    // output, because this includes periods to match Associated Press style.)
    a: function(_m) {
      return (_m.hour() > 12) ? '[p.m.]' : '[a.m.]';
    },
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
    f: function(_m) {
      if (_m.minutes() == 0)
        return 'h'
      else
        return 'h:mm'
    },
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
    // Daylight Savings Time, whether it’s in effect or not.
    I: '',
    // Day of the month without leading zeros.
    j: 'D',
    // Day of the week, textual, long.
    l: '',
    // Boolean for whether it’s a leap year.
    L: '',
    // Month, 2 digits with leading zeros.
    m: '',
    // Month, textual, 3 letters.
    M: 'MMM',
    // Month without leading zeros.
    n: '',
    // Month abbreviation in Associated Press style. Proprietary extension.
    // NOTE: simplifying this to just 3 letter month names with a period.
    N: function(_m) {
      if ([2, 3, 4, 5, 6].indexOf(_m.month()) > -1)
        return 'MMMM'
      else
        return 'MMM[.]'
    },
    // ISO-8601 week-numbering year, corresponding to the ISO-8601 week number
    // (W) which uses leap weeks. See Y for the more common year format.
    o: '',
    // Difference to Greenwich time in hours.
    O: '',
    // Time, in 12-hour hours, minutes and ‘a.m.’/’p.m.’, with minutes left off
    // if they’re zero and the special-case strings ‘midnight’ and ‘noon’ if
    // appropriate. Proprietary extension
    P: function(_m) {
      return '';
    },
    // RFC 5322 formatted date (https://tools.ietf.org/html/rfc5322.html).
    r: '',
    // Seconds, 2 digits with leading zeros.
    s: 'ss',
    // English ordinal suffix for day of the month, 2 characters.
    S: '',
    // Number of days in the given month.
    t: '',
    // Time zone of this machine.
    T: '',
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
    z: '',
    // Time zone offset in seconds. The offset for timezones west of UTC is
    // always negative, and for those east of UTC is always positive.
    Z: '',

  };

  moment.fn.django = function (format) {
    var momentFormat = format, value, _m = this;
    momentFormat = format.replace(/(\w+)/g, function (literal) { return '[' + literal + ']'; });

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
