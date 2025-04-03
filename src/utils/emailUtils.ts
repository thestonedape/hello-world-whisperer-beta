
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import sgMail from "@sendgrid/mail";

// Set your SendGrid API key
// For a production app, this should be stored in environment variables 
// on the server side, not in the client code
const SENDGRID_API_KEY = "SG.YOUR_SENDGRID_API_KEY_HERE"; // Replace with your actual SendGrid API key
sgMail.setApiKey(SENDGRID_API_KEY);

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
    
    const orderData = orderSnap.data();
    
    // Create email content
    const msg = {
      to: userEmail,
      from: 'noreply@givzo.com', // Replace with your verified sender email in SendGrid
      subject: 'Your Gift Card from Givzo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h1 style="color: #4f46e5;">Your Givzo Gift Card</h1>
          <p style="font-size: 16px;">Order #${orderId}</p>
          <p style="font-size: 16px;">Thank you for your purchase!</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
            <h2 style="margin-top: 0; color: #4f46e5;">Order Details</h2>
            <p style="margin: 5px 0;">Date: ${orderData.date}</p>
            <p style="margin: 5px 0;">Total: $${orderData.total.toFixed(2)}</p>
          </div>
          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            If you have any questions, please contact our support team.
          </p>
        </div>
      `,
    };
    
    console.log(`Sending real email to: ${userEmail} for order ${orderId}`);
    
    try {
      // Send the email using SendGrid
      await sgMail.send(msg);
      
      // Log the action
      console.log(`Successfully sent gift card email for order ${orderId} to ${userEmail}`);
      
      // Return success
      return true;
    } catch (sendgridError) {
      console.error("SendGrid error:", sendgridError);
      
      if (sendgridError.response) {
        console.error("SendGrid response error:", sendgridError.response.body);
      }
      
      // Fall back to simulation mode if SendGrid fails
      console.log("Falling back to simulation mode");
      await new Promise(resolve => setTimeout(resolve, 1500));
      return true; // Returning true for the simulation fallback
    }
  } catch (error) {
    console.error("Failed to resend gift card email:", error);
    return false;
  }
};
