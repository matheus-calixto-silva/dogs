import axios from 'axios';

const baseUrl = 'https://dogsapi.origamid.dev/json';

const getToken = async (userData) => {
  const request = await axios.post(`${baseUrl}/jwt-auth/v1/token`, userData);
  return request.data;
};

const tokenValidate = async (token) => {
  const request = await axios.post(
    `${baseUrl}/jwt-auth/v1/token/validate`,
    token,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return request.data;
};

const getUser = async (token) => {
  const request = await axios.get(`${baseUrl}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data;
};

const createUser = async (userData) => {
  const request = await axios.post(`${baseUrl}/api/user`, userData);
  return request.data;
};

const photoPost = async (formData) => {
  const token = window.localStorage.getItem('token');
  const request = await axios.post(`${baseUrl}/api/photo`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data;
};

export { getToken, tokenValidate, getUser, createUser, photoPost };
