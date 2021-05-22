import { BASE_PATH } from '../utils/constants';
import { authFetch } from '../utils/fetch';

export async function createAddressApi(address, logout) {
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode >= 300) throw new Error('Error del servidor');
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAddressesApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/addresses?user=${idUser}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode >= 300) throw new Error('Error del servidor');
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteAddressApi(idAddresses, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddresses}`;
    const params = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode >= 300) throw new Error('Error del servidor');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
