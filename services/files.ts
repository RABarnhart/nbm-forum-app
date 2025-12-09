import axios from "axios";
import { getToken } from "./token";

type PresignUrlPayload = {
  fileName: string;
  rootFolder: "images" | "videos" | "other";
};

const ERROR_HEADER = "File Service request error: ";

export namespace FilesService {
  export const getPresignUrl = async ({
    fileName,
    rootFolder,
  }: PresignUrlPayload): Promise<
    { url: string; fileName: string } | undefined
  > => {
    try {
      const token = await getToken();

      const res = await axios.get(
        `https://api.development.forum.mike-automations.link/files/upload/${rootFolder}`,
        {
          params: {
            fileName,
            folder: "avatar",
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return res.data;
    } catch (error) {
      console.log(ERROR_HEADER + "presign url", JSON.stringify(error, null, 4));
      return undefined;
    }
  };

  export const getResizeFile = async ({
    fileName,
    width,
    height,
  }: {
    fileName: string;
    width?: number;
    height?: number;
  }): Promise<{ url: string } | undefined> => {
    try {
      const token = await getToken();

      const res = await axios.get(
        "https://api.development.forum.mike-automations.link/files/download/resize",

        {
          params: {
            fileName,
            width,
            height,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return res.data;
    } catch (error) {
      console.log(
        ERROR_HEADER + "download resize",
        JSON.stringify(error, null, 4),
      );
      return undefined;
    }
  };
}

export default FilesService;
