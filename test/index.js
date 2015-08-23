    $(document).ready(function(){
      // init cookieInOne for search history
      var historyCookieOpts = {
        cookieName: 'searchHistory',
        maxReturnCookieNum: 20,
        cookieExpire: 1
      };
      var historyCookie = CookieInOne(historyCookieOpts);

      // set default history cookies
      historyCookie.clearcookieInOne();
      var defaultHistoryCookies = ['hello','world','ubuntu','linux','good night','I know HTML'];
      for (var i = 0; i < defaultHistoryCookies.length; i++) {
        historyCookie.addcookieInOne(defaultHistoryCookies[i]);
      };

      console.log(historyCookie.getcookieInOneArray());
      console.log(historyCookie);

    });

    // $("#inputbox").keyup(function(event) {
    //   var key = event.which;
    //   if (key === 13) {
    //     $('#searchhistory').hide();
    //     submitSearch();
    //   }
    //   if (key === 38) {
    //     var historyNow = getHistroyNow();
    //     gotoHistory(historyNow - 1);
    //   }
    //   if (key === 40) {
    //     var historyNow = getHistroyNow();
    //     gotoHistory(historyNow + 1);
    //   }
    // });


    // $('#inputbox').click(function() {
    //   if ($('#searchhistory')[0].innerHTML === '') {
    //     return;
    //   }

    //   var selectionStart = $('#inputbox')[0].selectionStart;
    //   if ($('#inputbox').val().length === 0 ||
    //     selectionStart === 0 ||
    //     selectionStart === $('#inputbox').val().length ||
    //     selectionStart === searchInputSelectionStart) {
    //     $('#searchhistory').toggle();
    //   } else {
    //     $('#searchhistory').hide();
    //   }
    //   searchInputSelectionStart = selectionStart;
    // });