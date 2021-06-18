import { useState, useEffect } from 'react';
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import { size } from 'lodash';
import classNames from 'classnames';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from '../../../api/favorite';

export default function HeaderGame({ game }) {
  const { poster, title } = game;
  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster?.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
}

function Info({ game }) {
  const { title, summary, price, discount, url } = game;
  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadFavorite, setReloadFavorite] = useState(false);
  const { auth, logout } = useAuth();
  const { addProductCart } = useCart();

  useEffect(() => {
    if (auth) {
      (async () => {
        const response = await isFavoriteApi(auth.idUser, game.id, logout);
        if (size(response)) setIsFavorite(true);
        else setIsFavorite(false);
      })();
    } else {
      setIsFavorite(false);
    }
  }, [auth, game, logout, reloadFavorite]);

  const addFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(!reloadFavorite);
    }
  };

  const deleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, game.id, logout);
      setReloadFavorite(!reloadFavorite);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {title}{' '}
        <Icon
          name={isFavorite ? 'heart' : 'heart outline'}
          className={classNames({ like: isFavorite })}
          link
          onClick={isFavorite ? deleteFavorite : addFavorite}
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48h</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de venta al publico: ${price}</p>
          <div className="header-game__buy-actions">
            <p>-{discount}$</p>
            <p>{(price - Math.floor(price * discount) / 100).toFixed(2)}</p>
          </div>
        </div>
        <Button
          className="header-game__buy-btn"
          onClick={() => addProductCart(url)}
        >
          Comprar
        </Button>
      </div>
    </>
  );
}
