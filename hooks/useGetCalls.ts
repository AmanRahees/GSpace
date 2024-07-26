import { useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

export const useGetCalls = () => {
  const [call, setCall] = useState<Call[]>([]);
  const [loading, setLoading] = useState(false);
  const client = useStreamVideoClient();
};
