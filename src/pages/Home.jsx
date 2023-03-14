import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { API, graphqlOperation } from "aws-amplify";
import { listProductos } from "../graphql/queries";
import { deleteProducto } from "../graphql/mutations";

const Home = () => {
  const [product, setProduct] = useState([]);

  const removeProduct = async (id) => {
    try {
      if (confirm("You sure to delete this product?")) {
        await API.graphql(graphqlOperation(deleteProducto, { input: { id } }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await API.graphql(graphqlOperation(listProductos));
      setProduct(result.data.listProductos.items);
    };
    fetchProducts();
    console.log(product);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 text-lg">
      {product.map((prod) => {
        const {
          id,
          product,
          price,
          class: clase,
          key,
          group,
          subGroup,
          commission,
          unit,
        } = prod;
        return (
          <div
            className="flex justify-between items-center border-2 border-gray-300 p-4 rounded-md shadow-lg"
            key={id}
          >
            <div className="flex gap-2 text-[.9rem]">
              <p className="text-gray-500">{id}</p>
              <p className="text-gray-500">{product}</p>
              <p className="text-gray-500">{price}</p>
              <p className="text-gray-500">{clase}</p>
              <p className="text-gray-500">{key}</p>
              <p className="text-gray-500">{group}</p>
              <p className="text-gray-500">{subGroup}</p>
              <p className="text-gray-500">{commission}</p>
              <p className="text-gray-500">{unit}</p>
            </div>
            <div className="flex gap-4 text-[.9rem]">
              <Link
                to={`/update/${id}`}
                className="text-white bg-blue-900 p-2 rounded-md"
              >
                Update
              </Link>
              <button
                className="text-white bg-red-700 p-2 rounded-md"
                onClick={() => removeProduct(id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
