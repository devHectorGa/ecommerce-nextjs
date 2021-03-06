import { BASE_PATH } from '../utils/constants';

export async function getLastGamesApi(limit = 10) {
  try {
    const limitItems = `?_limit=${limit}`;
    const sortItems = `&_sort=createdAt:desc`;
    const url = `${BASE_PATH}/games${limitItems}${sortItems}`;
    const response = await fetch(url);
    const result = await response.json();
    if (response.status > 300) throw new Error('Error en el servidor');
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getGamesPlatformApi(platform, limit = 10, start) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `_sort=createdAt:desc`;
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/games/?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    if (response.status > 300) throw new Error('Error en el servidor');
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTotalGamesPlatformApi(platform) {
  try {
    const url = `${BASE_PATH}/games/count?platform.url=${platform}`;
    const response = await fetch(url);
    const result = await response.json();
    if (response.status > 300) throw new Error('Error en el servidor');
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getGameByUrlApi(path) {
  try {
    const url = `${BASE_PATH}/games?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    if (response.status > 300) throw new Error('Error en el servidor');
    return result[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function searchGamesApi(title) {
  try {
    const url = `${BASE_PATH}/games?_q=${title}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
