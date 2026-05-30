import { useEffect, useState } from "react";

let useProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err))
      .finally(setLoading(false));
  }, [url]);
  return { products, loading, error };
};


export default useProducts;
