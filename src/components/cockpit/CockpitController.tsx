import { useState, useCallback } from "react";
import { Header } from "./Header";
import { SteeringWheel } from "./SteeringWheel";
import { CarTelemetry } from "./CarTelemetry";
import { GearShifter } from "./GearShifter";
import { Pedals } from "./Pedals";

interface ControlState {
  steeringAngle: number;
  throttle: boolean;
  brake: boolean;
  gear: string;
}

export const CockpitController = () => {
  const [controlState, setControlState] = useState<ControlState>({
    steeringAngle: 0,
    throttle: false,
    brake: false,
    gear: "N",
  });

  const handleAngleChange = useCallback((angle: number) => {
    setControlState(prev => ({ ...prev, steeringAngle: angle }));
    // TODO: Send to Flask backend
    console.log("Steering:", Math.round(angle));
  }, []);

  const handleThrottleChange = useCallback((active: boolean) => {
    setControlState(prev => ({ ...prev, throttle: active }));
    // TODO: Send to Flask backend
    console.log("Throttle:", active ? "ON" : "OFF");
  }, []);

  const handleBrakeChange = useCallback((active: boolean) => {
    setControlState(prev => ({ ...prev, brake: active }));
    // TODO: Send to Flask backend
    console.log("Brake:", active ? "ON" : "OFF");
  }, []);

  const handleGearChange = useCallback((gear: string) => {
    setControlState(prev => ({ ...prev, gear }));
    // TODO: Send to Flask backend
    console.log("Gear:", gear);
  }, []);

  const handleLaunch = useCallback(() => {
    // TODO: Send launch command to Flask backend
    console.log("LAUNCH MODE ACTIVATED");
  }, []);

  const handleDonut = useCallback(() => {
    // TODO: Send donut command to Flask backend
    console.log("DONUT MODE ACTIVATED");
  }, []);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Left Zone: Steering Wheel */}
        <div className="flex-[0.35] border-r border-border/30 racing-panel m-1 mr-0.5">
          <SteeringWheel 
            angle={controlState.steeringAngle} 
            onAngleChange={handleAngleChange} 
          />
        </div>
        
        {/* Center Zone: Car Telemetry */}
        <div className="flex-[0.4] racing-panel m-1 mx-0.5">
          <CarTelemetry 
            steeringAngle={controlState.steeringAngle}
            throttle={controlState.throttle}
            brake={controlState.brake}
            gear={controlState.gear}
            onLaunch={handleLaunch}
            onDonut={handleDonut}
          />
        </div>
        
        {/* Right Zone: Gear Shifter */}
        <div className="flex-[0.25] border-l border-border/30 racing-panel m-1 ml-0.5">
          <GearShifter 
            currentGear={controlState.gear} 
            onGearChange={handleGearChange} 
          />
        </div>
      </div>
      
      {/* Footer Zone: Pedals */}
      <div className="h-24 sm:h-28 border-t border-primary/30">
        <Pedals 
          onThrottleChange={handleThrottleChange}
          onBrakeChange={handleBrakeChange}
        />
      </div>
    </div>
  );
};
