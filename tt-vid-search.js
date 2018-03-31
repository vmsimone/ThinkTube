const YT_URL = "https://www.googleapis.com/youtube/v3/search";

function getData(searchTerm, callback) {
  const settings = {
    url: YT_URL,
    data: {
		    'maxResults': 10,
      	'part': 'snippet',
      	'key': 'AIzaSyAvJA1pHEuF1w6qTrNzvZdT1_-3ua6CYes',
      	'q': `${searchTerm}`
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function updateUI(JSON_Object) {
  let displayedResults = JSON_Object.pageInfo.resultsPerPage;
  let totalResults =  JSON_Object.pageInfo.totalResults;

  $('.results').append(
    `<p>Displaying ${displayedResults} of ${totalResults} results.</p>`
  );
}

function organizeData(data) {
  console.log('Data organizer running...');
  $('.results').append(`<h2>Here you go:</h2>`);
	updateUI(data);
  const thumbnailInfo = data.items.map((obj, index) => renderThumbnails(obj));
  console.log(data);
  $('.results').append(thumbnailInfo);
}

function renderThumbnails(JSON_Object) {
  let thumbImg = JSON_Object.snippet.thumbnails.medium.url;
  let thumbLink = `https://www.youtube.com/watch?v=${JSON_Object.id.videoId}`;
  let vidTitle = JSON_Object.snippet.title
  return `
  <div class="vid">
    <a href="${thumbLink}" target="_blank">
      <img src="${thumbImg}" alt="${vidTitle}" />
    </a>
    <h2>${vidTitle}</h2>
  </div>`;
}

function clearSearch() {
  $('.results').html('');
}

function readySearch() {
  $('.js-srch').submit(event => {
    event.preventDefault();
    clearSearch();
    const input = $(event.currentTarget).find('.js-input');
    const query = input.val();
    input.val('');
    getData(query, organizeData);
  });
}

$(readySearch);
