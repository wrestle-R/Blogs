import { app } from './firebase';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import type { Movie } from '@/types/movie';

const db = getFirestore(app);
const COLLECTION_NAME = 'movies';

export const addMovie = async (movieData: Omit<Movie, 'id' | 'createdAt'>): Promise<Movie> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...movieData,
      createdAt: Date.now(),
    });

    return {
      id: docRef.id,
      ...movieData,
      createdAt: Date.now(),
    };
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Movie[];
  } catch (error) {
    console.error('Error getting movies:', error);
    throw error;
  }
};

export const deleteMovie = async (movieId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, movieId));
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};
