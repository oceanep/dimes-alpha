import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';


const responseGoogle = (response) => {
    console.log(response);
}


const GoogleLoginComponent = ({ props }) => {
    ReactDOM.render(
        <GoogleLogin
            clientId="330818651692-jfn8mgdaemvds7bnt7qc906r48ebbd71.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />,
        document.getElementById('googleButton')
    )
}

export default GoogleLoginComponent;
