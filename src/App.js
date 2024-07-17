import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from '@rive-app/react-canvas';
import { useState, useEffect } from 'react';
import './index.css';

export const RiveDemo = () => {
  const STATE_MACHINE_NAME = 'State Machine 1';
  const BOOST_INPUT = 'boost';
  const TAP_INPUT = 'tap';

  const { RiveComponent, rive } = useRive({
    src: 'potato.riv',
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  const onTapInput = useStateMachineInput(rive, STATE_MACHINE_NAME, TAP_INPUT);
  const boostToggle = useStateMachineInput(rive, STATE_MACHINE_NAME, BOOST_INPUT);

  const [boostActive, setBoostActive] = useState(false);

  useEffect(() => {
    if (rive) {
      if (boostActive) {
        setBoostActive(true);
        boostToggle.value = true;
      } else {
        setBoostActive(false);
        boostToggle.value = false;
      }
    }
  }, [boostActive, boostToggle]);

  if (rive) {
    console.log(rive.contents);
  }

  return (
    <div className="content">
      <RiveComponent />
      <div className="footer">
        <button onClick={() => setBoostActive(!boostActive)}>
          {boostActive ? 'Deactivate Boost' : 'Activate Boost'}
        </button>
        <button onClick={() => onTapInput.fire()}>Tap</button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="RiveContainer">
      <RiveDemo />
    </div>
  );
}
