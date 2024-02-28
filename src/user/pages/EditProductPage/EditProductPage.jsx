import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";

import { category } from "../../../data/category";
import { Modal } from "../../../components/Modal/Modal";
import { ArrowLongLeftIcon } from "../NewProductPage/ArrowLongLeftIcon";
import { Header } from "../../../components/Header/Header";
import { database } from "../../../firebase/firebase";

export function EditProductPage() {
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(database, "products", productId);
      const productDoc = await getDoc(productRef);
      setProduct(productDoc.data());
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productRef = doc(database, "products", productId);
    await updateDoc(productRef, product);
    if (window.confirm("Are you sure you want edit the product?")) {
      setShowConfirmMessage(true);
    } else {
      return;
    }
  };

  return (
    <main className="flex flex-col w-full h-full px-6 bg-[#F9FAFB]">
      <Header pageName="Edit Product" />
      <Modal
        show={showConfirmMessage}
        onClose={() => setShowConfirmMessage(false)}
      >
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="font-poppins text-[#151D48] text-2xl font-semibold mb-8">
            Product Updated
          </h1>
          <NavLink to={"/products"}>
            <Button
              className="bg-[#0081FE] font-poppins text-white font-medium"
              size="lg"
              endContent={<ArrowLongLeftIcon />}
            >
              Check it
            </Button>
          </NavLink>
        </div>
      </Modal>
      <NavLink to={"/products"} className="flex items-center gap-3 mb-10">
        <Button
          isIconOnly
          aria-label="Back"
          variant="bordered"
          className="p-2 border-[#D0D0D0]"
        >
          <ArrowLongLeftIcon />
        </Button>
        <div className="font-poppins">
          <span className="text-[#7A7A7A] text-sm">Back to products</span>
          <p className="text-[#151D48] font-semibold text-xl">
            Add New Product
          </p>
        </div>
      </NavLink>

      {product && (
        <form onSubmit={handleSubmit} className="flex gap-5" action="">
          <section className="w-1/2">
            <article className="mb-10">
              <h6 className="mb-2 font-poppins text-[#3E3E3E] text-[19px] font-medium">
                Description
              </h6>
              <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
                <Input
                  name="title"
                  type="text"
                  value={product.title}
                  onChange={(e) =>
                    setProduct({ ...product, title: e.target.value })
                  }
                  variant="bordered"
                  label="Product name"
                  placeholder="Enter the name of the product"
                  labelPlacement="outside"
                  className="font-poppins"
                />
                <Textarea
                  variant="bordered"
                  name="description"
                  labelPlacement="outside"
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                  label="Description"
                  placeholder="Enter your description"
                  className="mt-7 font-poppins"
                />
              </div>
            </article>

            <article className="mb-10">
              <h6 className="mb-2 font-poppins text-[#3E3E3E] text-[19px] font-medium">
                Category
              </h6>
              <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
                <Select
                  label="Product Category"
                  name="category"
                  placeholder={product.category}
                  labelPlacement="outside"
                  variant="bordered"
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                >
                  {category.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </article>

            <article className="mb-10">
              <h6 className="mb-2 font-poppins text-[#3E3E3E] text-[19px] font-medium">
                Inventory
              </h6>
              <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
                <Input
                  type="number"
                  label="Quantity"
                  placeholder="#items available in stock"
                  className="font-poppins"
                  labelPlacement="outside"
                  variant="bordered"
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({ ...product, title: e.target.quantity })
                  }
                />
              </div>
            </article>

            <article className="mb-10">
              <h6 className="mb-2 font-poppins text-[#3E3E3E] text-[19px] font-medium">
                Pricing
              </h6>
              <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
                <Input
                  type="number"
                  label="Price per item"
                  name="price"
                  labelPlacement="outside"
                  variant="bordered"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
              </div>
            </article>

            <article className="mb-10">
              <h6 className="mb-2 font-poppins text-[#3E3E3E] text-[19px] font-medium">
                Versions
              </h6>
              <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
                <Input
                  type="text"
                  label="Colors"
                  name="colors"
                  placeholder="Red, Blue, Black, White"
                  labelPlacement="outside"
                  variant="bordered"
                  value={product.colors}
                  onChange={(e) =>
                    setProduct({ ...product, colors: e.target.value })
                  }
                />
              </div>
            </article>
          </section>

          <section className="w-1/2">
            <article className="mb-10">
              <h6 className="mb-2 font-poppins text-[#3E3E3E] text-[19px] font-medium">
                Shipping and delivery
              </h6>
              <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
                <Input
                  type="number"
                  label="Items Weight"
                  name="weight"
                  labelPlacement="outside"
                  variant="bordered"
                  value={product.weight}
                  onChange={(e) =>
                    setProduct({ ...product, weight: e.target.value })
                  }
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">Kg</span>
                    </div>
                  }
                />
                <p className="my-5 font-poppins text-[#3E3E3E] text-[10px] font-medium">
                  Package Size (The package use to ship the product)
                </p>

                <div className="mt-10">
                  <Input
                    type="number"
                    label="Length"
                    name="length"
                    labelPlacement="outside"
                    variant="bordered"
                    value={product.length}
                    onChange={(e) =>
                      setProduct({ ...product, length: e.target.value })
                    }
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">cm</span>
                      </div>
                    }
                  />
                </div>
                <div className="mt-10">
                  <Input
                    type="number"
                    label="Breadth"
                    name="breadth"
                    labelPlacement="outside"
                    variant="bordered"
                    value={product.breadth}
                    onChange={(e) =>
                      setProduct({ ...product, breadth: e.target.value })
                    }
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">cm</span>
                      </div>
                    }
                  />
                </div>
                <div className="mt-10">
                  <Input
                    type="number"
                    label="Width"
                    name="width"
                    labelPlacement="outside"
                    variant="bordered"
                    value={product.width}
                    onChange={(e) =>
                      setProduct({ ...product, width: e.target.value })
                    }
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">cm</span>
                      </div>
                    }
                  />
                </div>
              </div>
            </article>
            <div className="flex justify-center items">
              <button className="font-poppins px-5 py-4 rounded-lg text-white bg-[#0081FE] hover:bg-[#007ffed7] transition-all">
                Save Changes
              </button>
            </div>
          </section>
        </form>
      )}
    </main>
  );
}
