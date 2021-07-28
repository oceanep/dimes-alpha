import { useEffect } from 'react';

const useInjectedScript = () => {

    useEffect(() => {                       
        const script = document.createElement('script');
        script.innerText = "var hello;";
        script.id = 'injectedJs';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => {
            alert("hello world");
        };
        script.onreadystatechange = () => {
            if(this.readyState === 'complete'){
                this.onload();
            }
        };
    })
}

export default useInjectedScript;
