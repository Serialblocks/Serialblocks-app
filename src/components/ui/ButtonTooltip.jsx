import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ButtonTooltip = ({ children, title, asChild = false }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent className="rounded-md px-1.5 py-0.5">
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default ButtonTooltip;
