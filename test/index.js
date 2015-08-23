var historyCookie;
$(document).ready(function() {
  // init cookieInOne for search history
  var historyCookieOpts = {
    cookieName: 'searchHistory',
    maxReturnCookieNum: 20,
    cookieExpire: 1
  };
  historyCookie = CookieInOne(historyCookieOpts);

  setDefaultSearchHistory();
  loadSearchHistory();
  addStaticEvents();
});

function setDefaultSearchHistory() {
  historyCookie.clearcookieInOne();
  var defaultSearchHistoryCookies = ['Hello', 'World', 'Ubuntu', 'Linux', 'Good night', 'I know HTML'];
  for (var i = 0; i < defaultSearchHistoryCookies.length; i++) {
    historyCookie.addcookieInOne(defaultSearchHistoryCookies[i]);
  }
}

function loadSearchHistory() {
  var searchHistoryCookies = historyCookie.getcookieInOneArray();
  var html = $('#searchhistory_tmpl_idcls').html();
  var newHtml = '';
  for (var i = 0; i < searchHistoryCookies.length; i++) {
    newHtml = newHtml + html.replace('oneSearchHistoryStr', searchHistoryCookies[i]);
  }
  $('#searchhistory').html('');
  $('#searchhistory').html(newHtml);

  var searchInput = $('#searchinput');
  var historysDiv = $('#searchhistory .onesearchhistory');


  for (var i = 0; i < historysDiv.length; i++) {
    (function(i) {
      $(historysDiv[i]).find('.selecthistory').click(function() {
        searchInput.val(this.innerText);
      });

      $(historysDiv[i]).find('.deletehistory').click(function() {
        var historyStr = $(historysDiv[i]).find('.selecthistory')[0].innerText;
        historyCookie.deletecookieInOne(historyStr);
        loadSearchHistory();
      });
    })(i);
  }
}

function addStaticEvents() {
  $("#searchinput").keyup(function(event) {
    var key = event.which;
    if (key === 13) {
      $('#searchhistory').hide();
      submitSearch();
    }
    if (key === 38) {
      var historyNow = getHistroyNow();
      gotoHistory(historyNow - 1);
    }
    if (key === 40) {
      var historyNow = getHistroyNow();
      gotoHistory(historyNow + 1);
    }
  });

  var searchInputSelectionStart = 0;
  $('#searchinput').click(function() {
    if ($('#searchhistory')[0].innerHTML === '') {
      return;
    }

    var selectionStart = $('#searchinput')[0].selectionStart;
    if ($('#searchinput').val().length === 0 ||
      selectionStart === 0 ||
      selectionStart === $('#searchinput').val().length ||
      selectionStart === searchInputSelectionStart) {
      $('#searchhistory').toggle();
    } else {
      $('#searchhistory').hide();
    }
    searchInputSelectionStart = selectionStart;
  });

  $('#searchsubmit').click(function() {
    submitSearch();
  });
}

function submitSearch() {
  // add cookie
  var searchStr = $('#searchinput').val();
  historyCookie.addcookieInOne(searchStr);

  // reload history
  loadSearchHistory();
}

function getHistroyNow() {
  

}

function gotoHistory() {

}