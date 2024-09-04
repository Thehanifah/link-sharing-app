import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";

// Create (and Update) user profile
export async function createOrUpdateUserProfile(userId, profileData) {
    try {
      await setDoc(doc(db, "users", userId), profileData, { merge: true });
      console.log("Profile created/updated successfully");
    } catch (error) {
      console.error("Error creating/updating profile: ", error);
    }
  }

  // Read user profile
  export async function getUserProfile(userId) {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting profile: ", error);
      return null;
    }
  }


// Delete user profile

  export async function deleteUserProfile(userId) {
    try {
      await deleteDoc(doc(db, "users", userId));
      console.log("Profile deleted successfully");
    } catch (error) {
      console.error("Error deleting profile: ", error);
    }
  }