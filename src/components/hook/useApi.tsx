import { usePageLoader } from "../context/pageLoaderContext";

export function useApi() {
  const { onOpen: showPageLoader, onClose: hidePageLoader } = usePageLoader();

  const makeApiCall = async function <T>({
    apiFn,
    onSuccess,
    onFailure,
    successMsg,
    showLoader = true,
    showFailureMsg = true,
  }: {
    apiFn: () => T;
    onSuccess?: (response: T) => void;
    onFailure?: (error: unknown) => void;
    successMsg?: { title: string; description?: string; duration?: number };
    showLoader?: boolean;
    showFailureMsg?: boolean;
  }) {
    if (showLoader) {
      showPageLoader();
    }
    try {
      const response = await apiFn();
      hidePageLoader();
      if (successMsg) {
      }

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (e) {
      hidePageLoader();
      console.log(e);
      if (onFailure) {
        onFailure(e);
      }
      if (!showFailureMsg) {
        return;
      }
    }
  };

  return { makeApiCall };
}
