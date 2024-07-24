"use client";

import React, { useEffect, useState } from "react";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { Button } from "@/components/ui/button";

interface Props {
  toggleSetup: () => void;
}

const MeetingSetup = ({ toggleSetup }: Props) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall();
  if (!call) {
    throw new Error("usecall must be used within StreamCall Component");
  }
  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  return (
    <div className="flex-center h-screen w-full flex-col gap-3 text-white">
      <h1 className="text-2xl font-semibold">Setup</h1>
      <VideoPreview />
      <div className="flex-center gap-3 h-16">
        <label className="flex-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => {
              setIsMicCamToggledOn(e.target.checked);
            }}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          toggleSetup();
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
