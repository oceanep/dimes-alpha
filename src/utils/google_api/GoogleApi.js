import {google} from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    "330818651692-locc5gad48668ij33bdaptre2mi9irps.apps.googleusercontent.com",
    "zUx3tXdhaQVHWjvODeFnKLwf",
    "https://dimes-front.ngrok.io"
);

// generate a url that asks permissions for Google Calendar scopes
const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid'
];

const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    scope: scopes
});

oauth2Client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
        // store the refresh_token in my database!
        console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
});    

//const GoogleApi = {
//    authUrl: url,
//    goauth2Client: oauth2Client
//};

export {
    url
};
