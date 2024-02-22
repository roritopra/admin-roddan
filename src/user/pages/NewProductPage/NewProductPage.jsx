import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { database } from "../../../firebase/firebase" 
import { collection, addDoc } from "firebase/firestore";

export function NewProductPage() {
    async function handleUpload(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const projectsCollection = collection(database, 'products')
    formData.tags = formData.tags.split(',')

    // Get a reference to the storage service
    const storage = getStorage();

    // Create an array to store the download URLs
    const downloadURLs = [];

    // Iterate over each file
    for (const file of formData.images) {
      // Create a storage reference from our storage service
      const storageRef = ref(storage, 'images/' + file.name);

      // Upload the file to the ref
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Wait for the file to upload
      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, 
          (error) => {
            // Handle unsuccessful uploads
            console.error(error);
            reject(error);
          }, 
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);

              // Add the URL to the downloadURLs array
              downloadURLs.push(downloadURL);

              resolve();
            });
          }
        );
      });
    }

    // Add the URLs to the form data
    formData.images = downloadURLs;

    // Then add the document to Firestore
    addDoc(projectsCollection, formData)
  }

  return (
    <div>
        <form onSubmit={handleUpload} action="">
            <select name="category" id="">
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
            </select>
            <select name="colores" id="">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
            </select>
            <input name="price" type="number" />
            <input name="description" type="text" />
            <input name="image" type="file" />
            <input name="title" type="text" />
            <input name="tags" type="text" />
            <button>UPLOAD</button>
        </form>
    </div>
  )
}
