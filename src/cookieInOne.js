// CookieInOne
(function(root){
  var self = root;

  function _setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + '=' + encodeURIComponent(value) +
      ((expiredays === null) ? '' : ';expires=' + exdate.toGMTString());
  }

  function _getCookie(c_name) {
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + '=');
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(';', c_start);
        if (c_end === -1){
          c_end = document.cookie.length;
        }
        return decodeURIComponent(document.cookie.substring(c_start, c_end));
      }
    }
    return '';
  }

  self.CookieInOne = function(options) {
    var cookieInOne = {};
    var opts = {};
    opts.itemStoredName = options.itemStoredName;
    opts.maxItemCount = options.maxItemCount || 10;
    opts.maxItemCount  = opts.maxItemCount > 0 ? opts.maxItemCount : 10; 
    opts.cookieExpire = options.cookieExpire || 365;
    opts.itemSparator = options.itemSparator || '<===>';

    if (!opts.itemStoredName) {
      return null;
    }

    function addItem(value) {
      if (!value) {
        return;
      }

      var itemStr = _getCookie(opts.itemStoredName);
      itemStr = opts.itemSparator + itemStr + opts.itemSparator;
      itemStr = itemStr.replace(opts.itemSparator + value + opts.itemSparator, opts.itemSparator);
      itemStr = itemStr.replace(RegExp('^(' + opts.itemSparator + ')+|(' + opts.itemSparator + ')+$', 'g'), '');
      itemStr = itemStr === '' ? value : value + opts.itemSparator + itemStr;

      var itemArr = itemStr.split(opts.itemSparator);
      itemArr = itemArr.slice(0, opts.maxItemCount);
      itemStr = itemArr.join(opts.itemSparator);

      // maxCookieLength 4096
      // http://browsercookielimits.squawky.net/
      var cookieLength = encodeURIComponent(itemStr).length;
      while (cookieLength > 4096) {
        if (itemStr.indexOf(opts.itemSparator) === -1) {
          itemStr = '';
        } else {
          itemStr = itemStr.substring(0, itemStr.lastIndexOf(opts.itemSparator));
        }
        cookieLength = encodeURIComponent(itemStr).length;
      }

      _setCookie(opts.itemStoredName, itemStr, opts.cookieExpire);
    }

    function getItemArray() {
      var itemStr = _getCookie(opts.itemStoredName);
      if (itemStr === '') {
        return [];
      }

      itemArr = itemStr.split(opts.itemSparator);
      itemArr = itemArr.slice(0, opts.maxItemCount);
      return itemArr;
    }

    function deleteItem(value) {
      var itemStr = _getCookie(opts.itemStoredName);
      itemStr = opts.itemSparator + itemStr + opts.itemSparator;
      itemStr = itemStr.replace(opts.itemSparator + value + opts.itemSparator, opts.itemSparator);
      itemStr = itemStr.replace(RegExp('^(' + opts.itemSparator + ')+|(' + opts.itemSparator + ')+$', 'g'), '');

      _setCookie(opts.itemStoredName, itemStr, opts.cookieExpire);
    }

    function clearItem() {
      _setCookie(opts.itemStoredName, '', -1);
    }

    cookieInOne = {
      addItem: addItem,
      deleteItem: deleteItem,
      getItemArray: getItemArray,
      clearItem: clearItem
    };

    return cookieInOne;
  };
})(this);


// LocalStorageInOne
(function(root){
  var self = root;
  var myLocalStorage = window.localStorage;

  function _getItem(name){
      var itemStr = myLocalStorage.getItem(name) || '';
      return decodeURIComponent(itemStr);
  }


  function _setItem(name, value){
    myLocalStorage.setItem(name, encodeURIComponent(value));
  }

  function _clearItem(name){
    myLocalStorage.removeItem(name);
  }

  self.LocalStorageInOne = function(options){
    var localStorageInOne = {};
    var opts = {};
    opts.itemStoredName = options.itemStoredName;
    opts.maxItemCount = options.maxItemCount || Number.MAX_VALUE / 100;
    opts.maxItemCount  = opts.maxItemCount > 0 ? opts.maxItemCount : Number.MAX_VALUE / 100; 
    opts.maxItemCount = opts.maxItemCount;
    opts.itemSparator = options.itemSparator || '<===>';

    if (!opts.itemStoredName) {
      return null;
    }

    function addItem(value) {
      if (!value) {
        return;
      }

      var itemStr = _getItem(opts.itemStoredName);

      itemStr = opts.itemSparator + itemStr + opts.itemSparator;
      itemStr = itemStr.replace(opts.itemSparator + value + opts.itemSparator, opts.itemSparator);
      itemStr = itemStr.replace(RegExp('^(' + opts.itemSparator + ')+|(' + opts.itemSparator + ')+$', 'g'), '');
      itemStr = itemStr === '' ? value : value + opts.itemSparator + itemStr;

      var itemArr = itemStr.split(opts.itemSparator);
      itemArr = itemArr.slice(0, opts.maxItemCount);
      itemStr = itemArr.join(opts.itemSparator);

      _setItem(opts.itemStoredName, itemStr);
    }

    function getItemArray() {
      var itemStr = _getItem(opts.itemStoredName);
      if (itemStr === '') {
        return [];
      }

      itemArr = itemStr.split(opts.itemSparator);
      itemArr = itemArr.slice(0, opts.maxItemCount);
      return itemArr;
    }

    function deleteItem(value) {
      if (!value) {
        return;
      }

      var itemStr = _getItem(opts.itemStoredName);
      itemStr = opts.itemSparator + itemStr + opts.itemSparator;
      itemStr = itemStr.replace(opts.itemSparator + value + opts.itemSparator, opts.itemSparator);
      itemStr = itemStr.replace(RegExp('^(' + opts.itemSparator + ')+|(' + opts.itemSparator + ')+$', 'g'), '');

      _setItem(opts.itemStoredName, itemStr);
    }

    function clearItem() {
      _clearItem(opts.itemStoredName);
    }

    localStorageInOne = {
      addItem: addItem,
      deleteItem: deleteItem,
      getItemArray: getItemArray,
      clearItem: clearItem
    };

    return localStorageInOne;
  };
})(this);