import type { ApiRequestProps } from "@/components/ui/local/feedBackForm";

export const ISSMCreateUpdateFeedback = async ({
  method,
  _id,
  payload,
}: ApiRequestProps) => {
  try {
    const url = _id
      ? `${import.meta.env.VITE_API_BASE_URL}/api/feedback/${_id}`
      : `${import.meta.env.VITE_API_BASE_URL}/api/feedback`;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const ISSMGetFeedbacks = async (params?: {
  name?: string;
  rating?: string;
  page?: number;
}) => {
  try {
    const query = new URLSearchParams();
    if (params?.name) query.set("name", params.name);
    if (params?.rating && params.rating !== "0")
      query.set("rating", params.rating);
    if (params?.page) query.set("page", params.page.toString());
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/feedback?${query.toString()}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
