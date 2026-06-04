import { useEffect, useState } from "react";

// useProducts hook: fetches product data from a given API URL
// and manages loading, error, and data states.
const useProducts = (url) => {
  // State for product data
  const [productdata, setProductdata] = useState(null);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController to cancel fetch if component unmounts
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        // Reset states before fetching
        setLoading(true);
        setError(null);
        setProductdata(null);

        // Fetch product data
        const response = await fetch(url, { signal: controller.signal });

        // Handle HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        // Parse JSON response
        const data = await response.json();
        setProductdata(data);
      } catch (err) {
        // Ignore abort errors, handle others
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        // Stop loading regardless of success or failure
        setLoading(false);
      }
    };

    // Trigger fetch
    fetchProducts();

    // Cleanup: abort fetch on unmount
    return () => controller.abort();
  }, [url]); // Re-run when URL changes

  // Return hook state
  return { productdata, loading, error };
};

export default useProducts;
