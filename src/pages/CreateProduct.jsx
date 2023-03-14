import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { createProducto } from "../graphql/mutations";
import "@aws-amplify/ui-react/styles.css";


const CreateProduct = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
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
      graphqlOperation(createProducto, { input: newProduct })
    );
    console.log(result.data);
    setNewProduct(result.data.createProducto);

    try {
      const id = result.data.createProducto.id;
      await Storage.put(`${id}/${fileName.name}`, fileName, {
        contentType: fileName.type,
      });
      setTimeout(() => {
          navigate('/')
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFileName(file);
  };
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
            onChange={(e) =>
              setNewProduct({ ...newProduct, product: e.target.value })
            }
          />
          <input
            type="number"
            name="price"
            placeholder="Precio de producto"
            className="p-2 border-violet-300 border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            name="class"
            placeholder="Clase de producto"
            className="p-2 border-violet-300 border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, class: e.target.value })
            }
          />
          <input
            type="text"
            name="key"
            placeholder="Llave de producto"
            className="p-2 border-violet-300 border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, key: e.target.value })
            }
          />
          <input
            type="text"
            name="group"
            placeholder="Grupo de producto"
            className="p-2 border-violet-300 border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, group: e.target.value })
            }
          />
          <input
            type="text"
            name="subGroup"
            placeholder="Subgrupo de producto"
            className="p-2 border-violet-300 border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, subGroup: e.target.value })
            }
          />
          <input
            type="number"
            name="commission"
            placeholder="Comisión de producto"
            className="p-2 border-violet-300 border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, commission: e.target.value })
            }
          />
          <input
            type="text"
            name="unit"
            placeholder="Unidad de producto"
            className="p-2 border-violet-300 border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, unit: e.target.value })
            }
          />
          <button type="submit" className="register-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
