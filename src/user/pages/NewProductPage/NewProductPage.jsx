import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Image,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { ArrowLongLeftIcon } from "./ArrowLongLeftIcon";
import { category } from "../../../data/category";
import { Modal } from "../../../components/Modal/Modal";
import { Header } from "../../../components/Header/Header";
import { database } from "../../../firebase/firebase";

export function NewProductPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [imageURLs, setImageURLs] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          urls.push(reader.result);
          setImageURLs(urls);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  async function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectsCollection = collection(database, "products");
    formData.set("colors", formData.get("colors").split(","));

    if (window.confirm("Are you sure you want to add this product?")) {
      console.log(formData);
    } else {
      return;
    }

    const storage = getStorage();
    const uploaded = Array.from({ length: formData.getAll("images").length });

    formData.getAll("images").forEach((image, index) => {
      const storageRef = ref(storage, "images" + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload image ${index + 1} is ${progress}% done`);
          setProgress(progress);
          if (progress === 100) {
            setTimeout(() => {
              setProgress(0);
              setShowMessage(true);
            }, 2000);
          }
        },
        (error) => {
          console.error(error);
        },
        async () => {
          uploaded[index] = uploadTask.snapshot.ref;

          if (!uploaded.some((value) => !value)) {
            try {
              console.log(uploaded);
              const urls = await Promise.all(
                uploaded.map((file) => getDownloadURL(file))
              );

              console.log("Files available at", urls.join(", "));
              const data = Object.fromEntries(formData);
              data.images = urls;
              data.colors = data.colors.split(",");
              addDoc(projectsCollection, data);
              console.log(data);
            } catch (error) {
              console.error(error);
            }
          }
        }
      );
    });
  }

  return (
    <main className="flex flex-col w-full h-full px-6 bg-[#F9FAFB]">
      <Header pageName="New Product" />
      <Modal show={showMessage} onClose={() => setShowMessage(false)}>
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="font-satoshi text-[#151D48] text-2xl font-semibold mb-8">
            Product added successfully
          </h1>
          <NavLink to={"/products"}>
            <Button
              className="bg-[#0081FE] font-satoshi text-white font-medium"
              size="lg"
              endContent={<ArrowLongLeftIcon />}
            >
              Check it
            </Button>
          </NavLink>
        </div>
      </Modal>
      {progress > 0 && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <Spinner
            className="font-satoshi text-white"
            label="Loading..."
            size="lg"
            labelColor="defaultg"
            color="default"
          />
        </div>
      )}
      <NavLink to={"/products"} className="flex items-center gap-3 mb-10">
        <Button
          isIconOnly
          aria-label="Back"
          variant="bordered"
          className="p-2 border-[#D0D0D0]"
        >
          <ArrowLongLeftIcon />
        </Button>
        <div className="font-satoshi">
          <span className="text-[#7A7A7A] text-sm">Back to products</span>
          <p className="text-[#151D48] font-semibold text-xl">
            Add New Product
          </p>
        </div>
      </NavLink>

      <form onSubmit={handleUpload} className="flex gap-5" action="">
        <section className="w-1/2">
          <article className="mb-10">
            <h6 className="mb-2 font-satoshi text-[#3E3E3E] text-[19px] font-medium">
              Description
            </h6>
            <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
              <Input
                name="title"
                isRequired
                type="text"
                variant="bordered"
                label="Product name"
                placeholder="Enter the name of the product"
                labelPlacement="outside"
                className="font-satoshi"
              />
              <Textarea
                variant="bordered"
                isRequired
                name="description"
                labelPlacement="outside"
                label="Description"
                placeholder="Enter your description"
                className="mt-7 font-satoshi"
              />
            </div>
          </article>

          <article className="mb-10">
            <h6 className="mb-2 font-satoshi text-[#3E3E3E] text-[19px] font-medium">
              Category
            </h6>
            <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
              <Select
                label="Product Category"
                isRequired
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
            <h6 className="mb-2 font-satoshi text-[#3E3E3E] text-[19px] font-medium">
              Inventory
            </h6>
            <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
              <Input
                type="number"
                isRequired
                label="Quantity"
                placeholder="#items available in stock"
                className="font-satoshi"
                labelPlacement="outside"
                variant="bordered"
                name="quantity"
              />
            </div>
          </article>

          <article className="mb-10">
            <h6 className="mb-2 font-satoshi text-[#3E3E3E] text-[19px] font-medium">
              Pricing
            </h6>
            <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
              <Input
                type="number"
                isRequired
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
            <h6 className="mb-2 font-satoshi text-[#3E3E3E] text-[19px] font-medium">
              Versions
            </h6>
            <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
              <Input
                type="text"
                isRequired
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
          <article>
            <h6 className="mb-2 font-satoshi text-[#3E3E3E] text-[19px] font-medium">
              Product images
            </h6>
            <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold font-satoshi">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs font-satoshi text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    onChange={handleImageChange}
                    name="images"
                    accept="image/png, image/jpeg, image/JPG"
                    multiple
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </article>

          <div className="grid grid-cols-2 place-items-center my-10">
            {imageURLs.map((url, index) => (
              <Image width={100} key={index} src={url} alt="Preview" />
            ))}
          </div>

          <article className="mb-10">
            <h6 className="mb-2 font-satoshi text-[#3E3E3E] text-[19px] font-medium">
              Shipping and delivery
            </h6>
            <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
              <Input
                type="number"
                isRequired
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
              <p className="my-5 font-satoshi text-[#3E3E3E] text-[10px] font-medium">
                Package Size (The package use to ship the product)
              </p>

              <div className="mt-10">
                <Input
                  type="number"
                  isRequired
                  label="Length"
                  name="length"
                  labelPlacement="outside"
                  variant="bordered"
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
                  isRequired
                  label="Breadth"
                  name="breadth"
                  labelPlacement="outside"
                  variant="bordered"
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
                  isRequired
                  label="Width"
                  name="width"
                  labelPlacement="outside"
                  variant="bordered"
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
            <button className="font-satoshi px-5 py-4 rounded-lg text-white bg-[#0081FE] hover:bg-[#007ffed7] transition-all">
              Add product
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}
