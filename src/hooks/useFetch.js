import { useState, useCallback } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (func, params) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await func(params);
    } catch (err) {
      json = null;
      setError(err.response.data.message);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
