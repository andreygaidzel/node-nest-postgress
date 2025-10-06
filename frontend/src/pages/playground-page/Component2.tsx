import { type FC, memo, useEffect, useLayoutEffect } from 'react';

interface ChildProps {
  value: number;
}

const Component2: FC<ChildProps> = memo(({ value }) => {
  console.log('Component2');
  useEffect(() => {
    console.log('useEffect Component2');
    return () => console.log('unmount Component2');
  }, []);
  useLayoutEffect(() => {
    console.log('useLayoutEffect Component2');
  }, []);
  return <div>Component2 {value}</div>;
});

export default Component2;
