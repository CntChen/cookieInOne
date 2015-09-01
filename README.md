## Cookie In One ##

### Store your array data in one cookie ###

### Background ###

Usually browser can only store limited cookies for one domain, and web developer usually store only a few charaters to a cookie, while cookie size per cookie is max to 4KB.

This lib uses for storing array data in one cookie.

### Usage ###

* New CookieInOne Object

```
var myCookieInOne;

var cookieOpts = {
    itemStoredName: 'searchHistory', // necessary
    maxItemCount: 20, // default:10
    itemSparator: '<===>' // default: '<===>'
    cookieExpire: 1, // default: 365 // (day)
};
myCookieInOne = CookieInOne(cookieOpts);
```

* Add Cookie

```
myCookieInOne.addItem('cookieStr');
```

* Get Cookie Array

```
var cookieArr = myCookieInOne.getItemArray();
```

* Delete Cookie

```
myCookieInOne.deleteItem('cookieStr');
```

* Clear Cookies

```
myCookieInOne.clearItem();
```

### TODO ###

* Detect whether cookie disabled

* Localstorage 
*done* **LocalstorageOnOne**

**New LocalStorageInOne Object**

```
var myLocalStorageInOne;

var localStorageOpts = {
    itemStoredName: 'searchHistory', // necessary
    maxItemCount: 20, // default: Number.MAX_VALUE / 100
    itemSparator: '<===>' // default: '<===>'
};
myLocalStorageInOne = LocalStorageInOne(localStorageOpts);
```

method `addItem` `getItemArray` `deleteItem` `clearItem`


### Browser Store Data limit ###

* #### Cookie data limit in my development environment ####

**test tools**: [Browser Cookie Limits][Browser Cookie Limits]

* **chrome 44**

```
Guessing Max Cookie Count Per Domain: **180**
Guessing Max Cookie Size Per Cookie: **4096** bytes
```

* **firefox 39**

```
Guessing Max Cookie Count Per Domain: **150**
Guessing Max Cookie Size Per Cookie: **4097** bytes
```

* **IE 11**

```
Guessing Max Cookie Count Per Domain: **50**
Guessing Max Cookie Size Per Cookie: **5117** bytes
```

* #### localSotrage date limit ####

** test tools **: [Web Storage Support Test][Web Storage Support Test]

[cookieInOne]:https://github.com/CntChen/cookieInOne
[store search history in cookie demo]:http://cntchen.github.io/cookieInOne/test/index.html
[Browser Cookie Limits]:http://browsercookielimits.squawky.net/
[Web Storage Support Test]:http://dev-test.nemikor.com/web-storage/support-test/