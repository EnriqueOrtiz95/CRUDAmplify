import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { updateProducto } from "../graphql/mutations";
import { getProducto } from "../graphql/queries";
import "@aws-amplify/ui-react/styles.css";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateProduct, setUpdateProduct] = useState({
    id,
    product: "",
    price: "",
    class: "",
    key: "",
    group: "",
    subGroup: "",
    commission: "",
    unit: "",
  });
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await API.graphql(
      graphqlOperation(updateProducto, { input: updateProduct })
    );
    setUpdateProduct(result.data.updateProducto);
    try {
      await Storage.put(fileName.name, fileName, {
        contentType: fileName.type,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFileName(file);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await API.graphql(graphqlOperation(getProducto, { id }));
      console.log("result is", result.data.getProducto);
      setUpdateProduct(result.data.getProducto);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-[600px] w-[90%] p-12 relative"
        >
          <input
            type="file"
            name="photo"
            accept="image/*"
            id="photo"
            onChange={(e) => handleFile(e)}
          />
          <input
            type="text"
            name="product"
            placeholder="Nombre de producto"
            className="p-2 border-violet-300 border-2"
            defaultValue={updateProduct.product}
            onChange={(e) =>
              setNewProduct({ ...newProduct, product: e.target.value })
            }
          />
          <input
            type="number"
            name="price"
            placeholder="Precio de producto"
            className="p-2 border-violet-300 border-2"
            defaultValue={updateProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            name="class"
            placeholder="Clase de producto"
            className="p-2 border-violet-300 border-2"
            defaultValue={updateProduct.class}
            onChange={(e) =>
              setNewProduct({ ...newProduct, class: e.target.value })
            }
          />
          <input
            type="text"
            name="key"
            placeholder="Llave de producto"
            className="p-2 border-violet-300 border-2"
            defaultValue={updateProduct.key}
            onChange={(e) =>
              setNewProduct({ ...newProduct, key: e.target.value })
            }
          />
          <input
            type="text"
            name="group"
            placeholder="Grupo de producto"
            className="p-2 border-violet-300 border-2"
            defaultValue={updateProduct.group}
            onChange={(e) =>
              setNewProduct({ ...newProduct, group: e.target.value })
            }
          />
          <input
            type="text"
            name="subGroup"
            placeholder="Subgrupo de producto"
            className="p-2 border-violet-300 border-2"
            defaultValue={updateProduct.subGroup}
            onChange={(e) =>
              setNewProduct({ ...newProduct, subGroup: e.target.value })
            }
          />
          <input
            type="number"
            name="commission"
            placeholder="Comisión de producto"
            className="p-2 border-violet-300 border-2"
            defaultValue={updateProduct.commission}
            onChange={(e) =>
              setNewProduct({ ...newProduct, commission: e.target.value })
            }
          />
          <input
            type="text"
            name="unit"
            placeholder="Unidad de producto"
            className="p-2 border-violet-300 border-2"
            defaultValue={updateProduct.unit}
            onChange={(e) =>
              setNewProduct({ ...newProduct, unit: e.target.value })
            }
          />
          <button type="submit" className="register-btn">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
