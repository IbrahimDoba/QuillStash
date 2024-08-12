export const getUserInfo = async (): Promise<any> => {
  try {
    const response = await fetch(`/api/blog/userInfo`);
    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

