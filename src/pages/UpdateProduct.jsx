import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { updateProducto } from "../graphql/mutations";
import { getProducto } from "../graphql/queries";
import "@aws-amplify/ui-react/styles.css";

import { BsUpload } from "react-icons/bs";

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
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("aqui ando");
    const result = await API.graphql(
      graphqlOperation(updateProducto, {
        input: {
          id: updateProduct.id,
          product: updateProduct.product,
          price: updateProduct.price,
          class: updateProduct.class,
          key: updateProduct.key,
          group: updateProduct.group,
          subGroup: updateProduct.subGroup,
          commission: updateProduct.commission,
          unit: updateProduct.unit,
        },
      })
    );
    setUpdateProduct(result.data.updateProducto);
    try {
      await Storage.put(
        `${result.data.updateProducto.id}/${fileName.name}`,
        fileName,
        {
          contentType: fileName.type,
        }
      );
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setFileName(file);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await API.graphql(graphqlOperation(getProducto, { id }));
      console.log("result is", result.data.getProducto);
      setUpdateProduct(result.data.getProducto);
    };
    const fetchFile = async () => {
      const result = await Storage.get(`${id}/${fileName.name}`, {
        contentType: fileName.type,
      });
      console.log("result is", result);
      setFileName(result);
    };
    fetchProducts();
    fetchFile();
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
            placeholder="Nombre de producto"
            className="p-2 border-primary border-2"
            defaultValue={updateProduct.product}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, product: e.target.value })
            }
          />
          <input
            type="number"
            name="price"
            placeholder="Precio de producto"
            className="p-2 border-primary border-2"
            defaultValue={updateProduct.price}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            name="class"
            placeholder="Clase de producto"
            className="p-2 border-primary border-2"
            defaultValue={updateProduct.class}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, class: e.target.value })
            }
          />
          <input
            type="text"
            name="key"
            placeholder="Llave de producto"
            className="p-2 border-primary border-2"
            defaultValue={updateProduct.key}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, key: e.target.value })
            }
          />
          <input
            type="text"
            name="group"
            placeholder="Grupo de producto"
            className="p-2 border-primary border-2"
            defaultValue={updateProduct.group}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, group: e.target.value })
            }
          />
          <input
            type="text"
            name="subGroup"
            placeholder="Subgrupo de producto"
            className="p-2 border-primary border-2"
            defaultValue={updateProduct.subGroup}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, subGroup: e.target.value })
            }
          />
          <input
            type="number"
            name="commission"
            placeholder="Comisión de producto"
            className="p-2 border-primary border-2"
            defaultValue={updateProduct.commission}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, commission: e.target.value })
            }
          />
          <input
            type="text"
            name="unit"
            placeholder="Unidad de producto"
            className="p-2 border-primary border-2"
            defaultValue={updateProduct.unit}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, unit: e.target.value })
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
