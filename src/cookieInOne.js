  function _setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + encodeURIComponent(value) +
      ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
  }

  function _getCookie(c_name) {
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end === -1) c_end = document.cookie.length;
        return decodeURIComponent(document.cookie.substring(c_start, c_end));
      }
    }
    return '';
  }

  function CookieInOne(options) {
    var cookieInOne = {};
    var opts = {};
    opts.maxReturnCookieNum = options.maxReturnCookieNum || 10;
    opts.maxStoreCookieNum = opts.maxReturnCookieNum * 2;
    opts.cookieName = options.cookieName;
    opts.cookieExpire = options.cookieExpire || 365;
    opts.cookieSparator = options.cookieSparator || '<=>';

    if (!opts.cookieName) {
      return null;
    }

    function addcookieInOne(value) {
      if (!value) {
        return;
      }

      var cookieStr = _getCookie(opts.cookieName);
      cookieStr = opts.cookieSparator + cookieStr + opts.cookieSparator;
      cookieStr = cookieStr.replace(opts.cookieSparator + value + opts.cookieSparator, opts.cookieSparator);
      cookieStr = cookieStr.replace(RegExp('^(' + opts.cookieSparator + ')+|(' + opts.cookieSparator + ')+$', 'g'), '');
      cookieStr = cookieStr === '' ? value : value + opts.cookieSparator + cookieStr;

      var cookieArr = cookieStr.split(opts.cookieSparator);
      cookieArr = cookieArr.slice(0, opts.maxStoreCookieNum);
      cookieStr = cookieArr.join(opts.cookieSparator);

      // maxCookieLength 4090
      while (cookieStr.length > 4090) {
        console.log(cookieStr.length, cookieStr);
        if (cookieStr.indexOf(opts.cookieSparator) === -1) {
          cookieStr = '';
        } else {
          cookieStr = cookieStr.substring(0, cookieStr.lastIndexOf(opts.cookieSparator));
        }
      }

      _setCookie(opts.cookieName, cookieStr, opts.cookieExpire);
    }

    function getcookieInOneArray() {
      var cookieStr = _getCookie(opts.cookieName);
      if (cookieStr === '') {
        return [];
      }

      cookieArr = cookieStr.split(opts.cookieSparator);
      cookieArr = cookieArr.slice(0, opts.maxReturnCookieNum);
      return cookieArr;
    }

    function deletecookieInOne(value) {
      var cookieStr = _getCookie(opts.cookieName);
      cookieStr = opts.cookieSparator + cookieStr + opts.cookieSparator;
      cookieStr = cookieStr.replace(opts.cookieSparator + value + opts.cookieSparator, opts.cookieSparator);
      cookieStr = cookieStr.replace(RegExp('^(' + opts.cookieSparator + ')+|(' + opts.cookieSparator + ')+$', 'g'), '');

      _setCookie(opts.cookieName, cookieStr, opts.cookieExpire);
    }

    function clearcookieInOne() {
      _setCookie(opts.cookieName, '', -1);
    }

    cookieInOne = {
      addcookieInOne: addcookieInOne,
      deletecookieInOne: deletecookieInOne,
      getcookieInOneArray: getcookieInOneArray,
      clearcookieInOne: clearcookieInOne
    };

    return cookieInOne;
  }