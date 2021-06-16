import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';


const responseGoogle = (response) => {
    console.log(response);
}

const GoogleLoginComponent = ({ props }) => {
    ReactDOM.render(
        <GoogleLogin
            clientId="330818651692-locc5gad48668ij33bdaptre2mi9irps.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            approvalPrompt="force"
            prompt='consent'
            cookiePolicy={'single_host_origin'}
            scope={"https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid"}
        />,
        document.getElementById('googleButton')
    )
}

export default GoogleLoginComponent;
