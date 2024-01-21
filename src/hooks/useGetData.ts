import { useState, useEffect } from 'react';

function useGetData<S>(fetchFunc: () => Promise<S>) {
  const [data, setData] = useState<S | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDataFunc = () => {
      setIsLoading(true);
      fetchFunc()
        .then((fetchedData) => setData(fetchedData))
        .finally(() => setIsLoading(false));
    };
    getDataFunc();
  }, [fetchFunc]);

  return { data, isLoading };
}

export default useGetData;
