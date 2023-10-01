import React from 'react';

export default function useFetch<T>(
  fn: (args?: any) => Promise<any>,
  options: {
    onSuccess: (data: T) => any;
    onError: (err: string) => any;
    execOnMount?: boolean;
  },
) {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const exec = (args?: any) => {
    setLoading(true);
    setError('');
    fn(args)
      .then((d) => options.onSuccess(d as T))
      .catch((error) => {
        let e = '';
        if (typeof error === 'object') e = error?.message;
        else if (typeof error === 'string') e = error;
        else e = JSON.stringify(error || {});
        options.onError(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (!options.execOnMount) return;
    else exec();
  }, []);

  return { isLoading, error, exec };
}
