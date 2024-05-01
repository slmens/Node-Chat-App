import AxiosInstance from "./AxiosInstance";

export const createConversation = async (
  createrId: string,
  receiverId: string
) => {
  try {
    const response = await AxiosInstance.post("conversations", {
      createrId,
      receiverId,
    });
    if (response.status === 201) {
      return true;
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
    return [];
  }
};

export const deleteConversation = async (
  senderId: string,
  receiverId: string
) => {
  try {
    const response = await AxiosInstance.delete(
      `conversations/${senderId}/${receiverId}`
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
