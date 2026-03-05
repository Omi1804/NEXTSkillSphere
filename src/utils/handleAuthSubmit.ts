import { HeaderUser } from "@/types/header";
import { getApiErrorMessage, getClientErrorMessage } from "@/errors/clientError";

export const handleLoginSubmit = async (
  setError: any,
  setLoading: any,
  setUserDetails: any,
  onClose: any,
  email: string,
  password: string,
) => {
  setError(null);
  setLoading(true);

  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(getApiErrorMessage(responseData, "Unable to login"));
    }

    const userDetails: HeaderUser | undefined = responseData?.userDetails
      ? {
          id: responseData.userDetails.id,
          name: responseData.userDetails.name,
          email: responseData.userDetails.email,
          username: responseData.userDetails.username,
        }
      : undefined;

    if (!userDetails) throw new Error("Missing user details in response");

    setUserDetails?.(userDetails);
    onClose();
  } catch (err: any) {
    setError(getClientErrorMessage(err, "Something went wrong"));
  } finally {
    setLoading(false);
  }
};

type SignupPayload = {
  email: string;
  password: string;
  username: string;
  name: string;
};

export type SignupResponse = {
  message: string;
  user?: HeaderUser;
};

export const handleSignupSubmit = async ({
  payload,
}: {
  payload: SignupPayload;
}): Promise<SignupResponse> => {
  const response = await fetch("/api/user/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(payload),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(getApiErrorMessage(responseData, "Unable to create account"));
  }

  return responseData as SignupResponse;
};
