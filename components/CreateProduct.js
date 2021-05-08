import { useMutation } from '@apollo/client';
import Router from 'next/router';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $mrp: Int!
    $category: String
    $image: Upload
  ) {
    createProduct(
      data: {
        title: $title
        description: $description
        price: $price
        mrp: $mrp
        category: $category
        image: { create: { image: $image, altText: $title } }
      }
    ) {
      id
      price
      mrp
      description
      title
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    title: 'Nice Shoes',
    price: '99',
    mrp: '199',
    description: 'Very Nice Shoes',
    category: 'MEN CLOTHING',
  });

  const { title, price, mrp, description } = inputs;

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await createProduct();
        clearForm();
        Router.push({
          pathname: `/product/${data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="mrp">
          MRP
          <input
            type="number"
            id="mrp"
            name="mrp"
            placeholder="MRP"
            value={mrp}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="category">
          Category
          <select id="category" name="category" onChange={handleChange}>
            <option value="MEN CLOTHING">Men Clothing</option>
            <option value="WOMEN CLOTHING">Women Clothing</option>
            <option value="JEWELERY">Jewelery</option>
            <option value="ELECTRONICS">Electronics</option>
          </select>
        </label>

        <button type="submit">Add Product</button>
      </fieldset>
    </Form>
  );
}
