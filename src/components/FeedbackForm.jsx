import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Spinner from "@/assets/icons/spinner.svg?react";
import LoveItEmoji from "@/assets/emojis/LoveItEmoji.svg?react";
import ItsOkayEmoji from "@/assets/emojis/ItsOkayEmoji.svg?react";
import MehEmoji from "@/assets/emojis/MehEmoji.svg?react";
import NotGreatEmoji from "@/assets/emojis/NotGreatEmoji.svg?react";
import { useStore } from "@/store/Serialstore";
import { useUserStore } from "@/store/UserStore";

const FeedbackFormSchema = z.object({
  First_Name: z
    .string()
    .min(2, {
      message: "DisplayName must be at least 2 characters.",
    })
    .max(30, {
      message: "DisplayName must not be longer than 30 characters.",
    })
    .optional(),
  Last_Name: z
    .string()
    .min(2, {
      message: "DisplayName must be at least 2 characters.",
    })
    .max(30, {
      message: "DisplayName must not be longer than 30 characters.",
    })
    .optional(),
  Email: z
    .string({
      message: "Please select an Email to display.",
    })
    .email()
    .optional(),
  Feedback: z.string({
    required_error: "Please write a feedback.",
  }),
  Rate: z.enum(["Love It", "It's Okay", "Meh", "Hate It"], {
    required_error: "Please select an emoji.",
  }),
});

const FeedbackForm = ({ setStatus, isLoading, SUBMIT_STATUS }) => {
  const { First_Name, Last_Name, Email } = useUserStore();

  const form = useForm({
    resolver: zodResolver(FeedbackFormSchema),
    mode: "onChange",
    defaultValues: {
      First_Name,
      Last_Name,
      Email,
    },
  });

  async function onSubmit(data) {
    const formData = new FormData();
    for (const key in data)
      if (Object.hasOwn(data, key)) formData.append(key, data[key]);
    setStatus(SUBMIT_STATUS.LOADING);
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzoLWTIDhmhaUhiycCmPfsAvjD2zLEyuI6hMxxnlhXoKmVCa0A5a97T-pC2LD2SSvOI/exec",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        },
      );
      setStatus(SUBMIT_STATUS.SUCCESS);
    } catch (e) {
      setStatus(SUBMIT_STATUS.ERROR);
      useStore.setState({
        toastContent: {
          title: "Error",
          content:
            "An error has occured, nevertheless we would to hear from you",
          action: <Button>try again</Button>,
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="FeedbackForm">
        <FormField
          control={form.control}
          name="DisplayName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Feedback"
          render={({ field }) => (
            <FormItem className="p-2 outline-none">
              <FormControl>
                <Textarea
                  className="resize-none focus-visible:ring-1 focus-visible:ring-border focus-visible:ring-offset-0"
                  placeholder="Your feedback/suggestion..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="border-t-px flex flex-row items-center justify-between border-border bg-primary-foreground p-2">
          <FormField
            control={form.control}
            name="Rate"
            render={({ field }) => (
              <FormItem className="flex flex-col-reverse justify-center gap-1">
                <FormMessage className="self-stretch" />
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className=" flex  flex-row items-center justify-center"
                >
                  <FormItem>
                    <FormLabel className="hover:cursor-pointer [&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-foreground">
                      <FormControl>
                        <RadioGroupItem value="Love It" className="sr-only" />
                      </FormControl>
                      <div className="rounded-full p-1 text-center font-normal">
                        <LoveItEmoji className="!h-5 !w-5" />
                      </div>
                    </FormLabel>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="hover:cursor-pointer [&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-foreground">
                      <FormControl>
                        <RadioGroupItem value="It's Okay" className="sr-only" />
                      </FormControl>
                      <div className="rounded-full p-1 text-center font-normal">
                        <ItsOkayEmoji className="!h-5 !w-5" />
                      </div>
                    </FormLabel>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="hover:cursor-pointer [&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-foreground">
                      <FormControl>
                        <RadioGroupItem value="Meh" className="sr-only" />
                      </FormControl>
                      <div className="rounded-full p-1 text-center font-normal">
                        <MehEmoji className="!h-5 !w-5" />
                      </div>
                    </FormLabel>
                  </FormItem>

                  <FormItem>
                    <FormLabel className="hover:cursor-pointer [&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-foreground">
                      <FormControl>
                        <RadioGroupItem value="Hate It" className="sr-only" />
                      </FormControl>
                      <div className="rounded-full p-1 text-center font-normal">
                        <NotGreatEmoji className="!h-5 !w-5" />
                      </div>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="sm"
            form="FeedbackForm"
            disabled={isLoading}
          >
            {isLoading && (
              <Spinner className="mr-2 h-4 w-4 animate-spin [&>circle]:opacity-25 [&>path]:opacity-75 " />
            )}
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default FeedbackForm;
