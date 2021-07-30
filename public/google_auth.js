var CLIENT_ID = '330818651692-locc5gad48668ij33bdaptre2mi9irps.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDLBVfbmRwlIMi1fmwEwW9DRaXHIQP9IsQ';

var google_auth_object;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest", "https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/contacts openid";

var authorizeButton; // = document.getElementById('authorize_button');
var signoutButton ; //= document.getElementById('signout_button');

var auth_response;


window.google_obj = undefined;

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    //authorizeButton = document.getElementById('authorize_button');
    //signoutButton = document.getElementById('signout_button');
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function() {
        // Listen for sign-in state changes.
        //gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        //updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        //
        window.google_obj = gapi.auth2.getAuthInstance();
    }, function(error) {
        console.log(error)
        //appendPre(JSON.stringify(error, null, 2));
    });
}

function initSignin() {
    authorizeButton = document.getElementById('authorize_button');
    //signoutButton = document.getElementById('signout_button');
    authorizeButton.onclick = handleAuthClick;

    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */


function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        //authorizeButton.style.display = 'none';
        //want this to be a chain
        //signoutButton.style.display = 'block';
        listUpcomingEvents();
        listConnectionNames();
    } else {
        console.log("logged in");
        //authorizeButton.style.display = 'block';
        //signoutButton.style.display = 'none';
    }
}


/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn().then(
        res => handleSigninSuccess(res),
        err => console.log(err)
    )
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    localStorage.clear();
}

function handleSigninSuccess(res) {
    /*
      offer renamed response keys to names that match use
    */
    const basicProfile = res.getBasicProfile()
    const authResponse = res.getAuthResponse(true)
    res.googleId = basicProfile.getId()
    res.tokenObj = authResponse
    res.tokenId = authResponse.id_token
    res.accessToken = authResponse.access_token
    res.profileObj = {
        googleId: basicProfile.getId(),
        imageUrl: basicProfile.getImageUrl(),
        email: basicProfile.getEmail(),
        name: basicProfile.getName(),
        givenName: basicProfile.getGivenName(),
        familyName: basicProfile.getFamilyName()
    }
    auth_response = res;
    localStorage.setItem('token', res.tokenId)
    localStorage.setItem('username', res.profileObj.givenName);
    //FIX THIS -- Implement API Side User Signup
    localStorage.setItem('userId', res.googleId.slice(0,3));
    google_auth_object = gapi;
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
// function appendPre(message) {
//     var pre = document.getElementById('cal');
//     var textContent = document.createTextNode(message + '\n');
//     pre.appendChild(textContent);
// }

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 200,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;
        //appendPre('Upcoming events:');
        localStorage.setItem('google_events', JSON.stringify(events));
    });
}

function listConnectionNames() {
    gapi.client.people.people.connections.list({
        'resourceName': 'people/me',
        'pageSize': 1000,
        'personFields': 'names,emailAddresses,photos,coverPhotos,phoneNumbers,birthdays',
    }).then(function(response) {
        var connections = response.result.connections;
        localStorage.setItem('google_contacts', JSON.stringify(connections));
        window.location.reload();
    });
}

const asyncLocalStorage = {
    setItem: async function (key, value) {
        await null;
        return localStorage.setItem(key, value);
    },
    getItem: async function (key) {
        await null;
        return localStorage.getItem(key);
    }
};

