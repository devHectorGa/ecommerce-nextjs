import React, { useState } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/es';
import BasicModal from '../../Modal/BasicModal';

export default function Order({ order }) {
  const [showModal, setShowModal] = useState(false);
  const { game, totalPayment, createdAt, addressShipping } = order;
  const { title, poster, url } = game;

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster.url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p>{totalPayment} $</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-date">
              {moment(createdAt).format('L')} - {moment(createdAt).format('LT')}
            </p>
            {addressShipping && (
              <Icon
                name="eye"
                circular
                link
                onClick={() => setShowModal(true)}
              />
            )}
          </div>
        </div>
      </div>
      {addressShipping && (
        <AddressModal
          showModal={showModal}
          setShowModal={setShowModal}
          addressShipping={addressShipping}
          title={title}
        />
      )}
    </>
  );
}

function AddressModal({ showModal, setShowModal, addressShipping, title }) {
  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      size="tiny"
      title={title}
    >
      {addressShipping && (
        <>
          <h3>El pedido se ha enviado a la siguiente dirección: </h3>
          <div>
            <p>{addressShipping?.name}</p>
            <p>{addressShipping?.address}</p>
            <p>
              {addressShipping?.state}, {addressShipping?.city}{' '}
              {addressShipping?.postalCode}
            </p>
          </div>
        </>
      )}
    </BasicModal>
  );
}
