import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = "surveyResponses";

export const saveSurveyResponse = async (data) => {
  if (!db) {
    // Mock save to localStorage if Firebase is not properly configured by the user yet
    const existing = JSON.parse(localStorage.getItem('mockSurveys') || '[]');
    existing.push({ ...data, timestamp: new Date().toISOString() });
    localStorage.setItem('mockSurveys', JSON.stringify(existing));
    return;
  }
  
  await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    timestamp: new Date().toISOString()
  });
};

export const getSurveyResponses = async () => {
  if (!db) {
    return JSON.parse(localStorage.getItem('mockSurveys') || '[]');
  }
  
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
