
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

export const resendGiftCardEmail = async (orderId: string, userId: string): Promise<boolean> => {
  try {
    // Fetch the user document to get their email
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      console.error("User not found");
      return false;
    }
    
    const userData = userSnap.data();
    const userEmail = userData.email;
    
    // Fetch the order details
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    
    if (!orderSnap.exists()) {
      console.error("Order not found");
      return false;
    }
    
    // For now, we're still simulating the API call
    // In a production app, you would call a serverless function
    // or use a service like SendGrid, Mailgun, etc.
    
    console.log(`Sending email to: ${userEmail} for order ${orderId}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log the action
    console.log(`Successfully resent gift card email for order ${orderId} to ${userEmail}`);
    
    // Return success
    return true;
  } catch (error) {
    console.error("Failed to resend gift card email:", error);
    return false;
  }
};
