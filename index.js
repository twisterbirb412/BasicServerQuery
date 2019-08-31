'use strict';

//const apiKey = '326c2a57ab534a509a0c01a2973f16b0';

const searchURL = 'https://api.github.com/users/';


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<h3><a href="${responseJson[i].url}">${responseJson[i].full_name}</a></h3>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(query) {
  const params = {
    query,
  };

  const url = searchURL + query + '/repos';

  console.log(url);

  //const options = {
  //  headers: new Headers({
  //    "X-Api-Key": apiKey})
  //};

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getRepos(searchTerm);
  });
}

$(watchForm);