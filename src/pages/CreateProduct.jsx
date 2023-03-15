import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { createProducto } from "../graphql/mutations";
import "@aws-amplify/ui-react/styles.css";

import { BsUpload } from "react-icons/bs";

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
  const [image, setImage] = useState("");

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
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
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
            className="hidden"
            id="photo"
            onChange={(e) => handleFile(e)}
          />
          <div className="mx-auto">
            <label
              htmlFor="photo"
              className="flex items-center justify-center w-[100px] h-[100px] text-white cursor-pointer bg-gray-form4 borderUpload"
            >
              {image ? (
                <img src={image} alt={fileName} width={100} height={200} />
              ) : (
                <div>
                  <BsUpload className="text-primary text-[3rem] hover:text-gray-BA hover:text-sky-700" />
                </div>
              )}
            </label>
          </div>

          <input
            type="text"
            name="product"
            placeholder="Nombre de Producto"
            className="p-2 border-primary border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, product: e.target.value })
            }
          />
          <input
            type="number"
            name="price"
            placeholder="Precio del Producto"
            className="p-2 border-primary border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            name="class"
            placeholder="Clase del producto"
            className="p-2 border-primary border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, class: e.target.value })
            }
          />
          <input
            type="text"
            name="key"
            placeholder="Llave del producto"
            className="p-2 border-primary border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, key: e.target.value })
            }
          />
          <input
            type="text"
            name="group"
            placeholder="Grupo del producto"
            className="p-2 border-primary border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, group: e.target.value })
            }
          />
          <input
            type="text"
            name="subGroup"
            placeholder="Subgrupo del producto"
            className="p-2 border-primary border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, subGroup: e.target.value })
            }
          />
          <input
            type="number"
            name="commission"
            placeholder="Comisión del producto"
            className="p-2 border-primary border-2"
            onChange={(e) =>
              setNewProduct({ ...newProduct, commission: e.target.value })
            }
          />
          <input
            type="text"
            name="unit"
            placeholder="Unidad del producto"
            className="p-2 border-primary border-2"
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
