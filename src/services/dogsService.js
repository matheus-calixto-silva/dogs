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

const getPhotos = async ({ page, total, user }) => {
  const request = await axios.get(
    `${baseUrl}/api/photo/?page=${page}&_total=${total}&_user=${user}`,
    {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    }
  );
  return request.data;
};

const getPhoto = async (id) => {
  const request = await axios.get(`${baseUrl}/api/photo/${id}`, {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  });
  return request.data;
};

const commentPhoto = async ({ id, comment }) => {
  const token = window.localStorage.getItem('token');

  const request = await axios.post(`${baseUrl}/api/comment/${id}`, comment, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return request.data;
};

const deletePhoto = async (id) => {
  const token = window.localStorage.getItem('token');

  const request = await axios.delete(`${baseUrl}/api/photo/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return request.data;
};

const passwordLost = async (userData) => {
  const request = await axios.post(`${baseUrl}/api/password/lost`, userData);
  return request.data;
};

const passwordReset = async (userData) => {
  const request = await axios.post(`${baseUrl}/api/password/reset`, userData);
  return request.data;
};

const getStats = async (token) => {
  const request = await axios.get(`${baseUrl}/api/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.data;
};

export {
  getToken,
  tokenValidate,
  getUser,
  createUser,
  photoPost,
  getPhotos,
  getPhoto,
  commentPhoto,
  deletePhoto,
  passwordLost,
  passwordReset,
  getStats,
};
