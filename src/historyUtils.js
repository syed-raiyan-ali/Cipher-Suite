// historyUtils.js
import { db } from './firebaseClient'; // Import the db we exported above
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';

export async function addCloudHistory(entry, user) {
  try {
    const historyCollection = collection(db, 'history');
    
    const docRef = await addDoc(historyCollection, {
      user_id: user.uid,
      email: user.email,
      cipher: entry.cipher,
      mode: entry.mode,
      input: entry.input,
      key: entry.key,
      output: entry.output,
      timestamp: entry.timestamp || new Date().toISOString(),
      ip: entry.ip || null
    });

    console.log("Firestore history insert success, ID:", docRef.id);
    return { id: docRef.id };
  } catch (error) {
    console.error("Firestore history insert error:", error);
    return undefined;
  }
}

export async function getCloudHistory(user, days = 30) {
  try {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const historyCollection = collection(db, 'history');
    
    const q = query(
      historyCollection,
      where('user_id', '==', user.uid),
      where('timestamp', '>', cutoff),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(q);
    
    // Maps Firestore documents out into a clean flat array of data objects for your UI table
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { data, error: null };
  } catch (error) {
    console.error("Firestore get history error:", error);
    return { data: [], error };
  }
}

export async function deleteOldHistory(user, days = 30) {
  try {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const historyCollection = collection(db, 'history');
    
    const q = query(
      historyCollection,
      where('user_id', '==', user.uid),
      where('timestamp', '<', cutoff)
    );

    const querySnapshot = await getDocs(q);
    
    const deletePromises = querySnapshot.docs.map(document => 
      deleteDoc(doc(db, 'history', document.id))
    );
    
    await Promise.all(deletePromises);
    console.log(`Successfully cleaned up old history entries.`);
  } catch (error) {
    console.error("Firestore delete history error:", error);
  }
}