"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import HomeCard from "./home-card";
import MeetingModal from "./meeting-modal";

const MeetingTypeList = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!values.dateTime) {
      toast({
        title: "Please select a date and time",
      });
    }
    if (!user || !client) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to call");
      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description: description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to start meeting",
      });
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        title="New Meeting"
        description="Start an instant meeting"
        background="bg-orange-1"
        icon="/icons/add-meeting.svg"
        handleClick={() => {
          setMeetingState("isInstantMeeting");
        }}
      />
      <HomeCard
        title="Schedule Meeting"
        description="Plan your meeting"
        background="bg-blue-1"
        icon="/icons/schedule.svg"
        handleClick={() => {
          setMeetingState("isScheduleMeeting");
        }}
      />
      <HomeCard
        title="View Recordings"
        description="Check out your recordings"
        background="bg-purple-1"
        icon="/icons/recordings.svg"
        handleClick={() => {
          router.push("/recordings");
        }}
      />
      <HomeCard
        title="Join Meeting"
        description="via invitation link"
        background="bg-yellow-1"
        icon="/icons/recordings.svg"
        handleClick={() => {
          setMeetingState("isJoiningMeeting");
        }}
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
