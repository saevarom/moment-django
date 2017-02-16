(function () {
  var moment, replacements;

  if (typeof require !== "undefined" && require !== null) {
    moment = require('moment');
  } else {
    moment = this.moment;
  }

  replacements = {
    // 	'a.m.' or 'p.m.' (Note that this is slightly different than PHP’s output, because this includes periods to match Associated Press style.)
    a: function(_m) {
      return (_m.hour() > 12) ? '[p.m.]' : '[a.m.]';
    },
    // 'AM' or 'PM'.
    A: 'A',
    // Month, textual, 3 letters, lowercase.
    // NOTE: this will probably never work since it involves setting the formatted string to lowercase, after moment has formatted it.
    b: 'MMM',
    // ISO 8601 format. (Note: unlike others formatters, such as “Z”, “O” or “r”, the “c” formatter will not add timezone offset if value is a naive datetime
    c: 'YYYY-MM-DDTHH:mm:ss.SSSSSSZ',
    // Day of the month, 2 digits with leading zeros.
    d: 'DD',
    // Day of the week, textual, 3 letters.
    D: 'ddd',
    // Timezone name. Could be in any format, or might return an empty string, depending on the datetime.
    e: 'ZZ',
    // Month, locale specific alternative representation usually used for long date representation.
    E: 'MMMM',
    // Time, in 12-hour hours and minutes, with minutes left off if they’re zero. Proprietary extension.
    f: function(_m) {
      if (_m.minutes() == 0)
        return 'h'
      else
        return 'h:mm'
    },
    // Month, textual, long.
    F: '',
    //
    g: '',
    //
    G: '',
    //
    h: '',
    //
    H: '',
    //
    i: '',
    //
    I: '',
    //
    j: '',
    //
    l: '',
    //
    L: '',
    //
    m: '',
    //
    M: '',
    //
    n: '',
    //
    N: '',
    //
    o: '',
    //
    O: '',
    //
    P: '',
    //
    r: '',
    //
    s: '',
    //
    S: '',
    //
    t: '',
    //
    T: '',
    //
    u: 'SSSSSS',
    //
    U: '',
    //
    w: 'e',
    //
    W: 'W',
    //
    y: 'YY',
    //
    Y: 'YYYY',
    //
    z: '',
    //
    Z: '',

  };

  _appendMappedString = function (_m, formatString, mapping, beginIndex, currentIndex, resultString) {
    var tempString;

    if (beginIndex !== -1) {
      tempString = formatString.substring(beginIndex, currentIndex);
      // check if the temporary string has a known mapping
      if (mapping[tempString]) {
        tempString = mapping[tempString];
        if (tempString instanceof Function) {
          tempString = tempString(_m);
        }
      }
      resultString = resultString.concat(tempString);
    }
    return resultString;
  };

  translateFormat = function(_m, formatString, mapping) {
    var len = formatString.length,
        i = 0,
        beginIndex = -1,
        lastChar = null,
        currentChar = "",
        resultString = "";

    for (; i < len; i++) {
      currentChar = formatString.charAt(i);

      if (lastChar === null || lastChar !== currentChar) {
        // change detected
        resultString = _appendMappedString(_m, formatString, mapping, beginIndex, i, resultString);

        beginIndex = i;
      }

      lastChar = currentChar;
    }

    return _appendMappedString(_m, formatString, mapping, beginIndex, i, resultString);
  };

  moment.fn.django = function (format) {
    var momentFormat, value;
    var value = translateFormat(this, format, replacements)
    return this.format(value);
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = moment;
  } else {
    this.moment = moment;
  }
}).call(this);
