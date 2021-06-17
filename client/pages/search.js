import { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';

export default function Search() {
  useEffect(() => {
    document.getElementById('search-game').focus();
  }, []);

  return (
    <BasicLayout className="search">
      <h1>Búsqueda...</h1>
    </BasicLayout>
  );
}
