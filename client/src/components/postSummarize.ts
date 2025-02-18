import toast from "react-hot-toast";

import { API_BASE_URL } from "../api.url";
import {
  SummarizeDto,
  SummarizeError,
  SummarizeResponse,
} from "../../../shared";

export const postSummarize = async (
  dto: SummarizeDto
): Promise<SummarizeResponse | undefined> => {
  const response = await fetch(`${API_BASE_URL}/summarize`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const { message } = (await response.json()) as SummarizeError;

    toast.error(message);

    return;
  }
};
