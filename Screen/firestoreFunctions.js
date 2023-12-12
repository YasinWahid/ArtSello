import { collection, addDoc, serverTimestamp,  getDocs, where, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firestore } from '../firebase';

const getReviewsForProduct = async (productId) => {
  try {
    const reviewsCollection = collection(firestore, 'reviews');

    // Query reviews for the specific product ID
    const q = query(
      reviewsCollection,
      where('productId', '==', productId),
      orderBy('createdAt', 'desc') // Optional: Order reviews by timestamp (newest first)
    );

    const querySnapshot = await getDocs(q);

    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return reviews;
  } catch (error) {
    console.error('Error getting reviews for product:', error);
    throw error;
  }
};


const reviewsCollection = collection(firestore, 'reviews');

const addReviewToFirestore = async (productId, reviewDetails) => {
  try {
    const auth = getAuth();

    // Get the current user
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.warn('No user is currently authenticated');
      return;
    }

    // Fetch user data from Firestore
    const userDocRef = doc(firestore, 'Users', currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      // Include the current user's name in the review details
      reviewDetails.userName = userData.username || currentUser.displayName || 'Anonymous';
    } else {
      // Fallback to display name or 'Anonymous' if no username is found
      reviewDetails.userName = currentUser.displayName || 'Anonymous';
    }

    // Add timestamp to the review details
    reviewDetails.createdAt = serverTimestamp();

    // Include the product ID in the review details
    reviewDetails.productId = productId;

    // Add the review details to the 'reviews' collection
    const docRef = await addDoc(reviewsCollection, reviewDetails);

    console.log('Review added with ID:', docRef.id);
    return docRef.id; // Return the ID of the added review if needed
  } catch (error) {
    console.error('Error adding review:', error);
    throw error; // You can handle the error as needed in your component
  }
};

const addToFavorites = async (product) => {
  try {
    const favoritesCollection = collection(firestore, 'Favorites');
    const docRef = await addDoc(favoritesCollection, product);
    console.log('Product added to Favorites with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding product to Favorites: ', error);
  }
};

export { addToFavorites, addReviewToFirestore, getReviewsForProduct };

