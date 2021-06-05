import { Spinner, Text } from '@fluentui/react';
import { useEffect, useRef, useState } from 'react';

const TextAsync = (props: { stringPromise: Promise<string> }): JSX.Element => {
  const [textValue, setTextValue] = useState('');
  const mountedRef = useRef(true);

  useEffect(() => {
    setTextValue('');
    props.stringPromise.then((value) => {
      if (mountedRef.current) {
        setTextValue(value);
      }
    });
  }, [props.stringPromise]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  props.stringPromise;
  if (!textValue) return <Spinner />;
  return <Text style={{ fontStyle: 'italic' }}>{textValue}</Text>;
};

export default TextAsync;
