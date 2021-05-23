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
