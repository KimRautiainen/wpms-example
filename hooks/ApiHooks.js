import { useEffect, useState } from 'react';
import { apiUrl, appId } from '../utils/app-config';
import { doFetch } from '../utils/functions';
import { error } from '@babel/eslint-parser/lib/convert/index.cjs';

const useMedia = (update) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMedia = async () => {
    try {

      // ALL MEDIA FILES
      const json = await doFetch(apiUrl + 'media');

      // FIles with specific id:
      // const json = await doFetch(apiUrl + 'tags/' + appId);

      const mediaFiles = await Promise.all(
        json.map(async (item) => {
          const fileData = await doFetch(apiUrl + 'media/' + item.file_id);
          // console.log('fileData', fileData);
          return fileData;
        }),
      );
      // console.log(data);
      setMediaArray(mediaFiles);
    } catch (error) {
      console.error('loadMedia failed', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [update]);

  const postMedia = async (mediaData, token) => {
    setLoading(true);
    try {
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        body: mediaData,
      };

      const uploadResult = await doFetch(apiUrl + 'media', options);
      return uploadResult;
    } catch (error) {
      throw new Error('postMedia failed' + error.message);
    } finally {
      setLoading(false);
    }

  };

  return { mediaArray, postMedia, loading };
};

const useAuthentication = () => {
  const postLogin = async (user) => {
    return await doFetch(apiUrl + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: { 'x-access-token': token },
    };
    return await doFetch(apiUrl + 'users/user', options);
  };

  const postUser = async (userData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    return await doFetch(apiUrl + 'users', options);
  };

  const putUser = async (userData, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(userData),
    };
    return await doFetch(apiUrl + 'users', options);
  };

  const checkUsername = async (username) => {
    try {
      const response = await doFetch(`${apiUrl}users/username/${username}`);
      return response.available;
    } catch {
      throw new Error('checkusername Error', error.message);
    }
  };

  const getUserById = async (id, token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(apiUrl + 'users/' + id, options);
  };

  return { getUserByToken, postUser, checkUsername, putUser, getUserById };
};

const useTag = () => {

  const postTag = async (tag, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(tag),
    };
    return await doFetch(apiUrl + 'tags', options);
  };

  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(apiUrl + 'tags/' + tag);
    } catch (error) {
      throw new Error('getFilesByTag error', error.message);
    }
  };
  return { postTag, getFilesByTag };
};

const useFavourite = () => {
  const postFavourite = async (favourite, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(favourite),
    };
    return await doFetch(apiUrl + 'favourites', options);
  };

  const deleteFavourite = async (id, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(apiUrl + 'favourites/file/' + id, options);
  };

  const getFavouritesById = async (id) => {
    return await doFetch(apiUrl + 'favourites/file/' + id);
  };

  const getFavouritesByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(apiUrl + 'favourites', options);
  };

  return {
    postFavourite,
    deleteFavourite,
    getFavouritesById,
    getFavouritesByToken,
  };
};

export {useMedia, useAuthentication, useUser, useTag, useFavourite};
