import usePromise from 'react-promise';
import { Spinner, Text } from '@fluentui/react';

const TextAsync = (props: { stringPromise: Promise<string> }): JSX.Element => {
  const { value, loading } = usePromise<string>(props.stringPromise);
  if (loading) return <Spinner />;
  return <Text style={{ fontStyle: 'italic' }}>{value}</Text>;
};

export default TextAsync;
