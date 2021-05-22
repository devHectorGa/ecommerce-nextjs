import { BASE_PATH } from '../utils/constants';

export async function getPlatformApi() {
  try {
    const url = `${BASE_PATH}/platforms`;
    const response = await fetch(url);
    const result = await response.json();
    if (response.statusCode > 300) throw new Error('Error en el servidor');
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
