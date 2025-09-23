// TODO: replace basic fetches with this one!!
export const apiFetch = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    switch (response.status) {
      case 401:
        // re-direct + toast
        throw new Error(`Unauthorized, try logging in`);
      case 403:
        // re-direct + toast
        throw new Error(
          `You do not have the access rights required to perform this action`,
        );
    }

    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as T;
};
