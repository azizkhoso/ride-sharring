import React from 'react';

export default function useFetch<T>(
  fn: (args?: any) => Promise<any>,
  options: { onSuccess: (data: T) => any; onError: (err: string) => any },
) {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const exec = (args?: any) => {
    setLoading(true);
    setError('');
    fn(args)
      .then((d) => options.onSuccess(d as T))
      .catch((e) => {
        options.onError(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  };

  return { isLoading, error, exec };
}
