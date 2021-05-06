import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';

/* eslint-disable react/prop-types */
export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.image?.image?.publicUrlTransformed}
        alt={product.title}
      />
      <Title>
        <Link href="/products/$product.id">{product.title}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/* TODO: Add buttons to edit and delete items */}
    </ItemStyles>
  );
}
