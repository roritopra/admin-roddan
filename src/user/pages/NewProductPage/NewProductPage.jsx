import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { database } from "../../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

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
    <div>
      <form onSubmit={handleUpload} action="">
        <select name="category" id="">
          <option value="Laptops">Laptops</option>
          <option value="Speakers">Speakers</option>
          <option value="Consoles">Consoles</option>
          <option value="Smartwatches">Smartwatches</option>
          <option value="Tablets">Tablets</option>
          <option value="Smartphones">Smartphones</option>
        </select>
        <input name="colors" type="text" />
        <input name="price" type="number" />
        <input name="description" type="text" />
        <input
          name="cover"
          type="file"
          accept="image/png, image/jpeg, image/JPG"
          multiple
        />
        <input name="title" type="text" />
        <input name="versions" type="text" />
        <button>UPLOAD</button>
      </form>
    </div>
  );
}
