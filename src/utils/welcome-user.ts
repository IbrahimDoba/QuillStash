import axios from 'axios';

export const WelcomeUser = async (email: string) => {
  try {
    console.log(`Sending welcome email to: ${email}`);
    const response = await axios.post('/api/welcomeemail', { email });
    // console.log("Email sent successfully. Server response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    if (axios.isAxiosError(error)) {
      // console.error("Axios error details:", error.response?.data);
    }
    throw error; // Re-throw the error so it can be handled by the calling function
  }
};