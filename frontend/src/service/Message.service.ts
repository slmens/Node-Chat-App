import AxiosInstance from "./AxiosInstance";

export const createMessage = async (
  message: string,
  conversationId: string,
  receiverId: string
) => {
  try {
    const response = await AxiosInstance.post(`messages/send/${receiverId}`, {
      message,
      conversationId,
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

export const getMessages = async (receiverId: string, currentPage: number) => {
  try {
    const response = await AxiosInstance.get(
      `messages/${receiverId}?page=${currentPage}`
    );
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

export const getUnreadMessages = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  try {
    const response = await AxiosInstance.get(`messages/read/${conversationId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteUnreadMessages = async (conversationId: string) => {
  try {
    const response = await AxiosInstance.delete(
      `messages/unread/${conversationId}`
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
