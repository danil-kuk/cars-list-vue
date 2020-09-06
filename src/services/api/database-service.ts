import 'firebase/firestore';

import firebase from 'firebase/app';

/**
 * Cloud Firestore config.
 */
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
};

/**
 * Service to perform database calls.
 */
class DatabaseService {
  /** Cloud Firestore database. */
  private readonly database: firebase.firestore.Firestore;
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.firestore();
  }

  /**
   * Perform GET request to database and get entries in collection.
   */
  getAllItems(collectionId: string): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
    return this.database.collection(collectionId);
  }

  /**
   * Perform POST request to database that adds new item.
   * @param collectionId Cloud Firestore collection id.
   * @param item Item to add to database.
   */
  async postItem(collectionId: string, item: { id: string }): Promise<void> {
    const newItemDocRef = this.database.collection(collectionId).doc();
    item.id = newItemDocRef.id;
    await newItemDocRef.set(item);
  }

  /**
   * Perform PATCH request to database.
   * @param collectionId Cloud Firestore collection id.
   * @param item Item to update in database.
   */
  async updateItem(collectionId: string, item: { id: string }): Promise<void> {
    await this.database
      .collection(collectionId)
      .doc(item.id)
      .update(item);
  }

  /**
   * Perform DELETE request to database.
   * @param collectionId Cloud Firestore collection id.
   * @param itemId Id of item to delete.
   */
  async deleteItem(collectionId: string, itemId: string): Promise<void> {
    await this.database
      .collection(collectionId)
      .doc(itemId)
      .delete();
  }

  /**
   * Search all items where passed field value in database equal to passed value..
   * @param collectionId Cloud Firestore collection id.
   * @param field Field to search by.
   * @param value Value to search by.
   */
  async getItemsByField(collectionId: string, field: string, value: string): Promise<firebase.firestore.DocumentData[]> {
    const dbResponse = await this.database
      .collection(collectionId)
      .where(field, '==', value)
      .get();
    const items = dbResponse.docs.map((doc) => doc.data());
    return items;
  }
}

export default new DatabaseService();
