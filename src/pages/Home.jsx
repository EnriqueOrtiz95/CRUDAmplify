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
    <div className="flex flex-col gap-4 p-4 text-lg flex-wrap">
      <table>
        <thead className="bg-cyan-900 p-10 text-white">
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th className="hidden lg:table-cell">Price</th>
            <th className="hidden lg:table-cell">Class</th>
            <th className="hidden lg:table-cell">Key</th>
            <th className="hidden lg:table-cell">Group</th>
            <th className="hidden lg:table-cell">Subgroup</th>
            <th className="hidden lg:table-cell">Commission</th>
            <th className="hidden lg:table-cell">Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
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
              <tr key={id}>
                <td>{id.substring(0, 10)}</td>
                <td>{product.substring(0, 10)}</td>
                <td className="hidden lg:table-cell">{price}</td>
                <td className="hidden lg:table-cell">{clase.substring(0, 10)}</td>
                <td className="hidden lg:table-cell">{key.substring(0, 10)}</td>
                <td className="hidden lg:table-cell">{group.substring(0, 10)}</td>
                <td className="hidden lg:table-cell">{subGroup.substring(0, 10)}</td>
                <td className="hidden lg:table-cell">{commission}</td>
                <td className="hidden lg:table-cell">{unit.substring(0, 10)}</td>
                <td>
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
