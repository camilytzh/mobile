import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db } from "../config/firebase";
import { Expense } from "../models/Expense";

export const createExpense = async (
  expense: Omit<Expense, "id">
) => {
  const docRef = await addDoc(
    collection(db, "expenses"),
    expense
  );

  return docRef.id;
};