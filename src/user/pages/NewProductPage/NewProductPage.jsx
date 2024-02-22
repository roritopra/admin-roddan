import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { database } from "../../../firebase/firebase" 
import { collection, addDoc } from "firebase/firestore";

export function NewProductPage() {
  async function handleUpload(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const projectsCollection = collection(database, 'products')
    formData.versions = formData.versions.split(',')
    formData.colors = formData.colors.split(',')

    // Get a reference to the storage service
    const storage = getStorage();

    // Create a storage reference from our storage service
    const storageRef = ref(storage, 'images/' + formData.image.name);

    // Upload the file to the ref
    const uploadTask = uploadBytesResumable(storageRef, formData.image);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      }, 
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          // Add the URL to the form data
          formData.image = downloadURL;

          // Then add the document to Firestore
          addDoc(projectsCollection, formData)
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
            <input name="image" type="file" accept="image/png, image/jpeg, image/JPG" multiple />
            <input name="title" type="text" />
            <input name="versions" type="text" />
            <button>UPLOAD</button>
        </form>
    </div>
  )
}
