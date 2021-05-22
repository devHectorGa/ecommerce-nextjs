import { useState, useEffect } from 'react';
import { getAddressesApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function ListAddress() {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  useEffect(() => {
    (async () => {
      const response = getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);
  return <div>List</div>;
}
