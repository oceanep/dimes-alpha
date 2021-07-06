import { useState, useEffect } from 'react';

function useTemplates(apiCall, ...rest ) {

  //custom hook usable for both events and event templates, takes appropriate
  //function utility call

  const [ userId ] = [...rest]
  const [templates, setTemplates] = useState([])

  useEffect( () => {
    const getTemplates = async () => {
      try {
        const res = await apiCall(parseInt(userId))
        console.log('template:', res.data.data)
        const newTemplates = res.data.data.map( template => (
          {
            //write catch for UI based failing later
            title: template.title,
            desc: template.description,
            variant: `${ template.duration == 15 ? 'fifteen' : ''}${ template.duration == 30 ? 'thirty' : ''}${ template.duration == 60 ? 'sixty' : ''}`,
            value: `${ template.duration == 15 ? 'www.google.com' : ''}${ template.duration == 30 ? 'www.facebook.com' : ''}${ template.duration == 60 ? 'www.apple.com' : ''}`,

          }
        ))
        setTemplates(newTemplates)
      } catch (err){
          return err
      }
    }

    getTemplates()
  }, [])

  return templates
}

export default useTemplates
