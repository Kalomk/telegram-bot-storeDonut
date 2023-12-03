import { useState, useEffect } from 'react';

function useGetData<S>(fetchFunc: () => Promise<S>) {
  const [data, setData] = useState<S | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFunc()
      .then((fetchedData) => setData(fetchedData))
      .finally(() => setIsLoading(false));
  }, [fetchFunc]);

  return { data, isLoading };
}

export default useGetData;
