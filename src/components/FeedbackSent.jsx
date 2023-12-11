import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/UserStore";
const FeedbackSent = ({ setStatus, SUBMIT_STATUS }) => {
  const First_Name = useUserStore((store) => store.First_Name);
  return (
    <div className="flex flex-col items-center justify-center p-6 text-sm">
      <p>Thank you, {First_Name}!</p>
      <p>Your Feedback has been received.</p>
      <div className="flex flex-col gap-y-1 text-center">
        Feel free to share more insights anytime!
        <div className="flex flex-col gap-y-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setStatus(SUBMIT_STATUS.IDLE)}
          >
            Submit another
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a
              href="https://github.com/orgs/Serialblocks-labs/discussions"
              rel="noreferrer"
              target="_blank"
            >
              Github discussions
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FeedbackSent;
