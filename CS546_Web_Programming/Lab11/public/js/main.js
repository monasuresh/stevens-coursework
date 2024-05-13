/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page.
*/

(function ($) {
  let searchForm = $('#searchForm'),
    searchTermInput = $('#search_term'),
    errorParagraph = $('#error'),
    showListArea = $('#showList'),
    showArea = $('#show'),
    homePageLink = $('#homeLink');

  let requestConfig = {
    method: 'GET',
    url: 'http://api.tvmaze.com/shows'
  };
  //Make AJAX Call
  $.ajax(requestConfig).then(function (responseMessage) {
    responseMessage.map((show) => {
      let element = $(
        `<li><a href=${show._links.self.href
        }>${show.name
        }</a></li>`
      );
      
      showListArea.append(element);
    });

    homePageLink.hide();
    showArea.hide();
    showListArea.show();
  });

  $('#showList').on('click', 'a', function (event) {
    event.preventDefault();
    showListArea.hide();
    showArea.empty();

    var showUrl = $(this).attr('href');

    let requestConfig = {
      method: 'GET',
      url: showUrl
    };

    $.ajax(requestConfig).then(function (responseMessage) {
      populateShowDetails(responseMessage);
    });
  });

  function populateShowDetails(show) {
    let showName = $('<h1>' + (show.name || 'N/A') + '</h1>');
    showArea.append(showName);

    var showImage = $('<img src="' + (show.image && show.image.medium ? show.image.medium : '/public/no_image.jpeg') + '" alt="Show Image">');
    showArea.append(showImage);

    var definitionList = $('<dl></dl>');
    definitionList.append('<dt>Language</dt><dd>' + (show.language ? show.language : 'N/A') + '</dd>');
    definitionList.append('<dt>Genres</dt><dd>' + (show.genres && show.genres.length > 0 ? '<ul><li>' + show.genres.join('</li><li>') + '</li></ul>' : 'N/A') + '</dd>');
    definitionList.append('<dt>Average Rating</dt><dd>' + (show.rating && show.rating.average ? show.rating.average : 'N/A') + '</dd>');
    definitionList.append('<dt>Network</dt><dd>' + (show.network && show.network.name ? show.network.name : 'N/A') + '</dd>');
    definitionList.append('<dt>Summary</dt><dd>' + (show.summary ? show.summary : 'N/A') + '</dd>');

    showArea.append(definitionList);

    showArea.show();
    homePageLink.show();
    showListArea.hide();
  }

  searchForm.submit(function (event) {
    event.preventDefault();

    let searchTerm = searchTermInput.val().trim();

    if (!searchTerm) {
      errorParagraph.show();
      errorParagraph.html('Input cannot be empty or just spaces or just non-alphanumeric characters. Please provide some text.');
      return;
    } else {
      errorParagraph.hide();

      let requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/search/shows?q=' + searchTerm
      };

      $.ajax(requestConfig).then(function (responseMessage) {
        showListArea.empty();
        responseMessage.map((show) => {
          let element = $(
            `<li><a href=${show.show._links.self.href
            }>${show.show.name
            }</a></li>`
          );

          showListArea.append(element);
        });

        showArea.hide();
        homePageLink.show();
        showListArea.show();
      });
    }
  });
})(window.jQuery);