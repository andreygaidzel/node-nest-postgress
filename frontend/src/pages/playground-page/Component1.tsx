import { type JSX, memo, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../App.tsx';

function humanizeTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const Component1 = memo((props: { index: number }): JSX.Element => {
  const [timer, setTimer] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const user = useContext(UserContext);
  console.log(props);

  useEffect(() => {
    if (isActive) {
      intervalId.current = setInterval(() => {
        setTimer((prev) => prev + 100);
      }, 100);
    } else {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }
    return () => console.log('unmaunt timer');
  }, [isActive]);

  const handleToggle = () => {
    console.log(intervalId, isActive);
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setTimer(0);
  };
  return (
    <div className='timer-block'>
      {user?.name + props.index}
      <p>Timer {humanizeTime(timer)}</p>
      <div className='flex'>
        <button onClick={handleToggle}>Start/Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
});

export default Component1;
