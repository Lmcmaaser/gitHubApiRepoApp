'use strict';

//function to watch for submit event
//function to get requested repositories
//function to display results

function submitEvent() {
  $('form').submit(event => {
    event.preventDefault();
    console.log('submitEvent ran');
    const input = $("#handle").val();
    getRepos(input);
  });
}

function getRepos(userHandle) { //fetches repos from user handle input
  console.log('getRepos ran');
  const url = `https://api.github.com/users/${userHandle}/repos`
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.results').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson)
  console.log(responseJson.length)
    $('.results').empty();
    for (let i = 0; i < responseJson.length; i++) {
      $('.results').append(
        `<div class="result-item">
            <h4>${responseJson[i].name}</h4>
            <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
            <p>${responseJson[i].description}</p>
        </div>`
      )
    }
    //clear input for new input
    $('#handle').val('');
};

$(function() {
  console.log('App loaded! Waiting for submit!');
  submitEvent();
});