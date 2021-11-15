import React, { useState } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/es';
import BasicModal from '../../Modal/BasicModal';

export default function Order({ order }) {
  const { game, totalPayment, createdAt, addressShipping } = order;
  const { title, poster, url } = game;

  return (
    <>
      <div className="order">
        <div className="order__info">
          <Link href={`/${url}`}>
            <a>
              <Image src={poster.url} alt={title} />
            </a>
          </Link>
          <div className="order__info-data">
            <h2>{title}</h2>
            <p>{totalPayment} $</p>
          </div>
        </div>
      </div>
    </>
  );
}
