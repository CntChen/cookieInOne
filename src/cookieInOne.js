var CookieInOne = CookieInOne || {};
(function() {
  var maxReturnCookieNum = 10;
  var maxStoreCookieNum = maxReturnCookieNum * 2;
  var cookieName = 'CookieInOne';
  var cookieExpire = 365;
  var cookieSparator = '<=>';

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

  function addCookieInOne(value) {
    if (!value) {
      return;
    }

    var cookieStr = _getCookie(cookieName);
    cookieStr = cookieSparator + cookieStr + cookieSparator;
    cookieStr = cookieStr.replace(cookieSparator + value + cookieSparator, cookieSparator);
    cookieStr = cookieStr.replace(RegExp('^(' + cookieSparator + ')+|(' + cookieSparator + ')+$', 'g'), '');
    cookieStr = cookieStr === '' ? value : value + cookieSparator + cookieStr;

    var cookieArr = cookieStr.split(cookieSparator);
    cookieArr = cookieArr.slice(0, maxStoreCookieNum);
    cookieStr = cookieArr.join(cookieSparator);

    // maxCookieLength 4090
    while (cookieStr.length > 4090) {
      console.log(cookieStr.length, cookieStr);
      if (cookieStr.indexOf(cookieSparator) === -1) {
        cookieStr = '';
      } else {
        cookieStr = cookieStr.substring(0, cookieStr.lastIndexOf(cookieSparator));
      }
    }

    _setCookie(cookieName, cookieStr, cookieExpire);
  }

  function getCookieInOneArray() {
    var cookieStr = _getCookie(cookieName);
    if (cookieStr === '') {
      return [];
    }

    cookieArr = cookieStr.split(cookieSparator);
    cookieArr = cookieArr.slice(0, maxReturnCookieNum);
    return cookieArr;
  }

  function deleteCookieInOne(value) {
    var cookieStr = _getCookie(cookieName);
    cookieStr = cookieSparator + cookieStr + cookieSparator;
    cookieStr = cookieStr.replace(cookieSparator + value + cookieSparator, cookieSparator);
    cookieStr = cookieStr.replace(RegExp('^(' + cookieSparator + ')+|(' + cookieSparator + ')+$', 'g'), '');

    _setCookie(cookieName, cookieStr, cookieExpire);
  }

  function clearCookieInOne() {
    _setCookie(cookieName, '', -1);
  }

  CookieInOne = {
    addCookieInOne: addCookieInOne,
    deleteCookieInOne: deleteCookieInOne,
    getCookieInOneArray: getCookieInOneArray,
    clearCookieInOne: clearCookieInOne
  };
})();