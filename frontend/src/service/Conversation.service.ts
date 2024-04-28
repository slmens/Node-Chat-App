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
      console.log(response);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
