import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { database } from "../../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Header } from "../../../components/Header/Header";
import { Button } from "@nextui-org/react";
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
      <NavLink to={"/products"} className="flex items-center gap-3">
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
          <div>
            <input name="title" type="text" />
            <input name="description" type="text" />
          </div>

          <select name="category" id="">
          <option value="Laptops">Laptops</option>
          <option value="Speakers">Speakers</option>
          <option value="Consoles">Consoles</option>
          <option value="Smartwatches">Smartwatches</option>
          <option value="Tablets">Tablets</option>
          <option value="Smartphones">Smartphones</option>
        </select>
        
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
