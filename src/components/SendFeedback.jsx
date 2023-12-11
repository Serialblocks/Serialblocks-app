import FeedbackForm from "@/components/FeedbackForm";
import FeedbackSent from "@/components/FeedbackSent";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
const SUBMIT_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};
const SendFeedback = () => {
  const [status, setStatus] = useState(SUBMIT_STATUS.IDLE);
  const isLoading = status === SUBMIT_STATUS.LOADING;
  const isError = status === SUBMIT_STATUS.ERROR;
  const isSubmitted = status === SUBMIT_STATUS.SUCCESS;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Feedback</Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden p-0">
        {!isSubmitted ? (
          <FeedbackForm
            SUBMIT_STATUS={SUBMIT_STATUS}
            setStatus={setStatus}
            isLoading={isLoading}
            isSubmitted={isSubmitted}
            isError={isError}
          />
        ) : (
          <FeedbackSent setStatus={setStatus} SUBMIT_STATUS={SUBMIT_STATUS} />
        )}
      </PopoverContent>
    </Popover>
  );
};
export default SendFeedback;
