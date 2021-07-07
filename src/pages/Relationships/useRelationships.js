import { useState, useEffect } from 'react';
import axios from 'axios';

function useRelationships() {

    const [contactItems, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchContacts = async () => {
        setLoading(true)
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setContacts(res.data);
        setLoading(false);
      };

      fetchContacts()

    }, [])

    console.log("contacts fetched: ", contactItems)
    return { contactItems, loading }
}

export default useRelationships
