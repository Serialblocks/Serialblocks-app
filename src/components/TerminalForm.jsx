import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { useStore } from "@/store/Serialstore";
import { ChevronRight } from "lucide-react";

const TerminalForm = () => {
  const { writeToPort } = useStore((store) => store.serialActions);
  const isPortOpen = useStore((store) => store.isPortOpen);

  const form = useForm({
    mode: "onChange",
  });

  const handleWritingOnPort = ({ command }) => {
    form.setValue("command", "");
  };

  return (
    <Form {...form}>
      <form
        className="m-1 flex flex-row justify-between gap-2"
        onSubmit={form.handleSubmit(handleWritingOnPort)}
        id="TerminalForm"
      >
        <FormField
          control={form.control}
          name="command"
          disabled={!isPortOpen}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="h-8 px-2"
                    type="text"
                    placeholder={
                      isPortOpen ? "Enter your command (e.g., LED_TOGGLE)" : ""
                    }
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button type="submit" disabled={!isPortOpen} className="h-8" size="sm">
          <ChevronRight className="mr-2 h-5 w-5" />
          Send
        </Button>
      </form>
    </Form>
  );
};
export default TerminalForm;
