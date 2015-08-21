    $("#inputbox").keyup(function(event) {
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


    $('#inputbox').click(function() {
      if ($('#searchhistory')[0].innerHTML === '') {
        return;
      }

      var selectionStart = $('#inputbox')[0].selectionStart;
      if ($('#inputbox').val().length === 0 ||
        selectionStart === 0 ||
        selectionStart === $('#inputbox').val().length ||
        selectionStart === searchInputSelectionStart) {
        $('#searchhistory').toggle();
      } else {
        $('#searchhistory').hide();
      }
      searchInputSelectionStart = selectionStart;
    });