import { useState, useCallback } from 'react';
import { BACKEND_URL } from '../assets/options';

const useFetch = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const request = useCallback( async (url, method = 'GET', body = null, header = false ) => {

    setLoading(true);
    setError(null);

    try {
      const defaultHeader = { 'Content-type': 'application/json' };

      let bodyToSend;

      // If body is given and required to be sent.
      if (body) {

        // Check if header is needed that us the body is to be sent as json,
        // so json stringify the data.
        if (header) bodyToSend = JSON.stringify(body);

        // If header is not required means the body is form data so do not stringify.
        else bodyToSend = body;
      } else bodyToSend = null;

      const response = await fetch(`${BACKEND_URL}/api/${url}`, {
        method,
        credentials: 'include',
        headers: header ? defaultHeader : {},
        body: bodyToSend
      });

      const data = await response.json();
      if (!response.ok) {

        // If the error is conflict throw different error as it is critical.
        if (response.status === 409) throw new Error('409');

        // Throw custom error as fetch failed.
        throw new Error(data.message || "Something went wrong");
      }
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong");
      throw err;
    }
  }, [setLoading, setError]);


  const get = useCallback((url) => request(url, 'GET', null, false));
  const post = useCallback((url, body, header = true) => request(url, 'POST', body, header));
  const del = useCallback((url) => request(url, 'DELETE', null, false));
  const put = useCallback((url, body) => request(url, 'PUT', body, true));

  return { loading, error, get, post, put, del };
}

export default useFetch;