import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";

import { category } from "../../../data/category";
import { ArrowLongLeftIcon } from "../NewProductPage/ArrowLongLeftIcon";
import { Header } from "../../../components/Header/Header";
import { database } from "../../../firebase/firebase";

export function EditProductPage() {
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
  };

  return (
      <main className="flex flex-col w-full h-full px-6 bg-[#F9FAFB]">
        <Header pageName="Edit Product" />

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
                    placeholder="Select a category"
                    labelPlacement="outside"
                    variant="bordered"
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
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            cm
                          </span>
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
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            cm
                          </span>
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
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            cm
                          </span>
                        </div>
                      }
                    />
                  </div>
                </div>
              </article>
              <div className="flex justify-center items">
                <button className="font-poppins px-5 py-4 rounded-lg text-white bg-[#0081FE] hover:bg-[#007ffed7] transition-all">
                  Add product
                </button>
              </div>
            </section>
          </form>
        )}
      </main>

  );
}
