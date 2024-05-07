import AxiosInstance from "./AxiosInstance";

export const createConversation = async (
  createrId: string,
  receiverId: string,
  conversationName: string
) => {
  try {
    const response = await AxiosInstance.post("conversations", {
      createrId,
      receiverId,
      conversationName,
    });
    if (response.status === 201) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getConversations = async (userId: string) => {
  try {
    const response = await AxiosInstance.get(`conversations/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);

    if ((error as any).response && (error as any).response.status === 401) {
      return "unauthorized";
    }
    return [];
  }
};

export const deleteConversation = async (selectedConversationId: string) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return false;
    }
    const response = await AxiosInstance.delete(
      `conversations/${selectedConversationId}/${userId}`
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
