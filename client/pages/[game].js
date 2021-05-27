import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout';

export default function Game() {
  const data = useRouter();

  return (
    <BasicLayout className="game">
      <h1>Games</h1>
    </BasicLayout>
  );
}
