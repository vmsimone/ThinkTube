const YT_URL = "https://www.googleapis.com/youtube/v3/search";

function getData(searchTerm, callback) {
  const settings = {
    url: YT_URL,
    data: {
      part: 'snippet',
      key: 'AIzaSyAvJA1pHEuF1w6qTrNzvZdT1_-3ua6CYes',
      q: `${searchTerm}`
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function organizeData(data) {
  console.log('Data organizer running...');
  const thumbnailInfo = data.items.map((obj, index) => renderThumbnails(obj));
  console.log('finished');
  $('.results').append(thumbnailInfo);
}

function renderThumbnails(JSON_Object) {
  let thumbImg = JSON_Object.snippet.thumbnails.medium.url;
  let thumbLink = `https://www.youtube.com/watch?v=${JSON_Object.id.videoId}`;
  console.log(`
  `);
  return `
  <div class="vid">
    <a href="${thumbLink}" target="_blank">
      <img src="${thumbImg}" alt="YouTube thumbnail" />
    </a>
  </div>`;
}

function readySearch() {
  $('.js-srch').submit(event => {
    event.preventDefault();
    const input = $(event.currentTarget).find('.js-input');
    const query = input.val();
    input.val('');
    getData(query, organizeData);
  });
}

$(readySearch);
