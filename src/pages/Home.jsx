import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { API, graphqlOperation } from "aws-amplify";
import { listProductos } from "../graphql/queries";
import { deleteProducto } from "../graphql/mutations";

const Home = () => {
  const [product, setProduct] = useState([]);

  const removeProduct = async (id) => {
    try {
      if (confirm("¿Seguro que quieres eliminar este producto?")) {
        await API.graphql(graphqlOperation(deleteProducto, { input: { id } }));
        setProduct(product.filter((prod) => prod.id !== id));
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
    // console.log(product);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 text-lg flex-wrap">
      <h1 className="text-[2rem] text-primary font-bold mb-6">Catalogo General</h1>
      <table>
        <thead className="bg-primary p-10 text-white">
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th className="hidden lg:table-cell">Precio</th>
            <th className="hidden lg:table-cell">Clase</th>
            <th className="hidden lg:table-cell">Llave</th>
            <th className="hidden lg:table-cell">Grupo</th>
            <th className="hidden lg:table-cell">Subgrupo</th>
            <th className="hidden lg:table-cell">Comisión</th>
            <th className="hidden lg:table-cell">Unidad</th>
          </tr>
        </thead>
        <div className="my-4"></div>
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
              <tr key={id} className='text-center'>
                <td>{id.substring(0, 5)}</td>
                <td>{product}</td>
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
                      className="text-white bg-primary hover:bg-sky-700 p-2 rounded-md"
                    >
                      Actualizar
                    </Link>
                    <button
                      className="text-white bg-red-600 hover:bg-red-800 p-2 rounded-md"
                      onClick={() => removeProduct(id)}
                    >
                      Eliminar
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
