import { useState, useEffect } from 'react';
import { Container, Grid, Image, Input } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid>
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.webp" alt="devHectorGa" />
      </a>
    </Link>
  );
}

function Search() {
  const [searchStr, setSearchStr] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (searchStr.length) {
      router.push(`/search?query=${encodeURIComponent(searchStr)}`);
    } else {
      if (router?.query?.query?.length) {
        router.push(`/search`);
      }
    }
  }, [searchStr]);

  return (
    <Input
      id="search-game"
      icon={{ name: 'search' }}
      value={
        router?.query?.query?.length
          ? decodeURIComponent(router?.query?.query)
          : ''
      }
      onChange={(_, data) => setSearchStr(data.value)}
    />
  );
}
