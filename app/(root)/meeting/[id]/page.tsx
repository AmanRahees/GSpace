"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useGetCallById } from "@/hooks/useGetCallById";
import { Loader, MeetingRoom, MeetingSetup } from "@/components/elements";

const Meeting = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(params.id);
  if (!isLoaded || isCallLoading) {
    return <Loader />;
  }
  const toggleSetup = () => {
    setIsSetupComplete(!isSetupComplete);
  };
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup toggleSetup={toggleSetup} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
