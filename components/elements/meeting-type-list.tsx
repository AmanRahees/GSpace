"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import ReactDatePicker from "react-datepicker";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
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
  const [callDetail, setCallDetail] = useState<Call>();
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
      setCallDetail(call);
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
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;
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
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          title="Create Meeting"
          className="text-center"
          buttonText="Schedule Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Select date and time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => {
                setValues({ ...values, dateTime: date! });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          title="Start an Instant Meeting"
          className="text-center"
          image="/icons/checked.svg"
          buttonText="copy"
          buttonIcon="/icons/copy.svg"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
        />
      )}
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
