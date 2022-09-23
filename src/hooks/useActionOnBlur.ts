// Reference: https://bobbyhadz.com/blog/react-check-if-browser-tab-has-focus
import { useEffect, useState } from "react";

export default function useActionOnBlur({
  onBlur,
  onFocus,
}: {
  onBlur: () => void;
  onFocus: () => void;
}) {
  const [tabHasFocus, setTabHasFocus] = useState(true);

  useEffect(() => {
    const handleFocus = () => {
      setTabHasFocus(true);
      onFocus();
    };

    const handleBlur = () => {
      setTabHasFocus(false);
      onBlur();
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return { tabHasFocus };
}
