import { useEffect } from 'react';

const useGoogleAuth = (url) => {

    useEffect(() => {                       
        const script = document.createElement('script');
        script.src = url
        script.id = 'google_auth';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => {
            window.handleClientLoad();
        };
        script.onreadystatechange = () => {
            if(this.readyState === 'complete'){
                this.onload();
            }
        };
    })
}

export default useGoogleAuth;
