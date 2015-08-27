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
  historyCookie.clearCookie();
  var defaultSearchHistoryCookies = ['Hello', 'World', 'Ubuntu', 'Linux', 'Good night', 'I know HTML'];
  for (var i = 0; i < defaultSearchHistoryCookies.length; i++) {
    historyCookie.addCookie(defaultSearchHistoryCookies[i]);
  }
}

function loadSearchHistory() {
  var searchHistoryCookies = historyCookie.getCookieArray();
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
        $('#searchhistory').hide();
      });

      $(historysDiv[i]).find('.deletehistory').click(function() {
        var historyStr = $(historysDiv[i]).find('.selecthistory')[0].innerText;
        historyCookie.deleteCookie(historyStr);
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
  historyCookie.addCookie(searchStr);

  // reload history
  loadSearchHistory();
}

function getHistroyNow() {
  var searchHistory = $('#searchhistory .selecthistory');
  var length = searchHistory.length;
  for (var i = 0; i < length; i++) {
    if ($(searchHistory[i]).hasClass('selected')) {
      return i + 1;
    }
  }
  return 0;
}

function gotoHistory(index) {
    var searchHistory = $('#searchhistory .selecthistory');
    searchHistory.removeClass('selected');
    var historyMax = searchHistory.length;

    if (index === -1) {
      index = historyMax;
    }

    if (index > 0 && index <= historyMax) {
      $(searchHistory[index - 1]).addClass('selected');
      var historyStr = searchHistory[index - 1].innerText || searchHistory[index - 1].textContent;
      $('#searchinput').val(historyStr);
    }
}