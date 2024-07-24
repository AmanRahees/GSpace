import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

const EndCallBtn = () => {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  return <div>EndCallBtn</div>;
};

export default EndCallBtn;
