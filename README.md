## Cookie In One ##

### Store your array data in one cookie ###

### Deom: [store search history demo][Store search history demo]

### Background ###

Usually browser can only store limited cookies for one domain, and web developer usually store only a few charaters to a cookie, while cookie size per cookie is max to 4KB.

This lib uses for storing array data in one cookie.

### Usage ###

* New CookieInOne Object
		
	  var myCookieInOne;

      var cookieOpts = {
	    cookieName: 'searchHistory', // necessary
	    maxReturnCookieNum: 20, // default:10
	    cookieExpire: 1, // default: 365 // (day)
		cookieSparator: '<=>' // default: '<=>'
      };
      myCookieInOne = CookieInOne(cookieOpts);

* Add Cookie

      myCookieInOne.addCookieInOne('cookieStr');

* Get Cookie Array

	  var cookieArr = myCookieInOne.getCookieInOneArray();

* Delete Cookie

      myCookieInOne.deleteCookieInOne('cookieStr');

* Clear Cookies
    
      myCookieInOne.clearCookieInOne();

### TODO ###

* Detect whether cookie disabled

* Use Localstorage

---
#### Cookie limit in my development environment ####

**test tools**: [Browser Cookie Limits][Browser Cookie Limits]

* **chrome 44**

      Guessing Max Cookie Count Per Domain: **180**
      Guessing Max Cookie Size Per Cookie: **4096** bytes

* **firefox 39**

      Guessing Max Cookie Count Per Domain: **150**
      Guessing Max Cookie Size Per Cookie: **4097** bytes

* **IE 11**

      Guessing Max Cookie Count Per Domain: **50**
      Guessing Max Cookie Size Per Cookie: **5117** bytes


[store search history demo]:http://cntchen.github.io/cookieInOne/test/index.html
[Browser Cookie Limits]:http://browsercookielimits.squawky.net/