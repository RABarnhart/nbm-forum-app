import axios from "axios";
import { getToken } from "./token";
import { TermsAndConditionsResponse } from "@/types/api";

const API_ENDPOINT_TERMS =
  "https://api.development.forum.mike-automations.link/terms-conditions";

export const getTerms = async (): Promise<TermsAndConditionsResponse> => {
  const token = await getToken();

  if (!token) {
    console.error(
      "Access token not found. Cannot perform authenticated search.",
    );
    throw new Error("Authentication required.");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(API_ENDPOINT_TERMS, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching terms od service with token:", error);
    throw error;
  }
};


