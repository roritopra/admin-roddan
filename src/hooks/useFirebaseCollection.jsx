import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase/firebase';

export function useFirebaseCollection(collectionName) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const dataCollection = collection(database, collectionName);
      const snapshot = await getDocs(dataCollection);
      const dataList = [];
      snapshot.forEach((doc) => {
        dataList.push(doc.data());
      });
      setData(dataList);
    })();
  }, [collectionName]);

  return data;
}