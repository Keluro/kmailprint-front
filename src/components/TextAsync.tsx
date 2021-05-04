import { Spinner, Text } from '@fluentui/react';
import { useEffect, useState } from 'react';

const TextAsync = (props: { stringPromise: Promise<string> }): JSX.Element => {
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    setTextValue('');
    props.stringPromise.then((value) => {
      setTextValue(value);
    });
  }, [props.stringPromise]);

  props.stringPromise;
  if (!textValue) return <Spinner />;
  return <Text style={{ fontStyle: 'italic' }}>{textValue}</Text>;
};

export default TextAsync;
