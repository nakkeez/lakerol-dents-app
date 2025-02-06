import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

/**
 * Fetch data from the server and set to the state.
 * Show toast messages to the user based on the server response.
 *
 * @param url The URL to fetch data from
 * @param setData The function to set the fetched data to the state
 * @param onNotFoundMessage The message to show when no data is found
 * @param accessToken The access token to authenticate the request
 */
export async function fetchData<T>({
  url,
  setData,
  onNotFoundMessage,
  accessToken,
}: {
  url: string;
  setData: (data: T) => void;
  onNotFoundMessage?: string;
  accessToken?: string;
}) {
  try {
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    });

    if (response.ok) {
      const data: T = await response.json();
      setData(data);

      if (Array.isArray(data) && data.length === 0) {
        toast.warn(onNotFoundMessage || "No data found");
      }
    } else if (response.status === 401) {
      toast.error("Session expired. Please login again");
      setTimeout(() => {
        signOut();
      }, 3000);
    } else if (response.status === 404 && onNotFoundMessage) {
      toast.warn(onNotFoundMessage);
    } else {
      toast.error("Failed to fetch data from the server");
    }
  } catch {
    toast.error(
      "Error while fetching data from the server. Please try again later"
    );
  }
}
