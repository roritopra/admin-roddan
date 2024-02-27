import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore"; 
import { useEffect, useState } from 'react';
import { database } from '../../../firebase/firebase';

export function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = doc(database, 'products', productId);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        setProduct(productSnapshot.data());
      } else {
        console.log('No such product!');
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      {/* other product details */}
    </div>
  );
}
