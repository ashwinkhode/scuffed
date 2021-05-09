import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const ProductsPage = () => {
  const { query } = useRouter();
  return (
    <div>
      <Pagination page={query.page || 1} />
      <Products page={query.page || 1} />
      <Pagination page={query.page || 1} />
    </div>
  );
};

export default ProductsPage;
