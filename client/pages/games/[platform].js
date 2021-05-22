import { useRouter } from 'next/router';
import BasicLayout from '../../layouts/BasicLayout';

export default function Platform() {
  const { query } = useRouter();

  return (
    <BasicLayout>
      <h1>Estamos en plataforma {query?.platform}</h1>
    </BasicLayout>
  );
}
