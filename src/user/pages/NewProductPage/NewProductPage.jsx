import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { database } from "../../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Header } from "../../../components/Header/Header";
import { Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { ArrowLongLeftIcon } from "./ArrowLongLeftIcon";
import { NavLink } from "react-router-dom";

export function NewProductPage() {
  async function handleUpload(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const projectsCollection = collection(database, "products");
    formData.versions = formData.versions.split(",");
    formData.colors = formData.colors.split(",");

    const storage = getStorage();
    const storageRef = ref(storage, "images/" + formData.cover.name);
    const uploadTask = uploadBytesResumable(storageRef, formData.cover);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          formData.cover = downloadURL;

          addDoc(projectsCollection, formData);
        });
      }
    );
  }

  return (
    <main className="flex flex-col w-full h-full px-6 bg-[#F9FAFB]">
      <Header pageName="New Product" />
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

      <form onSubmit={handleUpload} className="flex" action="">
        <section className="w-1/2">
          <article className="mb-10">
            <h6 className="mb-2 font-poppins text-[#3E3E3E] text-[19px] font-medium">
              Description
            </h6>
            <div className="border-[#E4E4E7] border-1.5 rounded-[9px] p-4">
              <Input
                name="title"
                type="text"
                variant="bordered"
                label="Website"
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
                labelPlacement="outside"
                variant="bordered"
              >
                <SelectItem value="Laptops">Laptops</SelectItem>
                <SelectItem value="Speakers">Speakers</SelectItem>
                <SelectItem value="Consoles">Consoles</SelectItem>
                <SelectItem value="Smartwatches">Smartwatches</SelectItem>
                <SelectItem value="Tablets">Tablets</SelectItem>
                <SelectItem value="Smartphones">Smartphones</SelectItem>
              </Select>
            </div>
          </article>

          <input name="inventory" type="text" />
        </section>

        <section className="w-1/2">
          <input
            name="cover"
            type="file"
            accept="image/png, image/jpeg, image/JPG"
            multiple
          />

          <input name="versions" type="text" />
          <input name="colors" type="text" />
          <input name="price" type="number" />
        </section>

        <button>UPLOAD</button>
      </form>
    </main>
  );
}
