import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Moon from "@/assets/icons/Moon.svg?react";
import Sun from "@/assets/icons/Sun.svg?react";
import { useUserStore } from "@/store/UserStore";
const EditProfileFormSchema = z.object({
  First_Name: z
    .string()
    .min(2, {
      message: "First Name must be at least 2 characters.",
    })
    .max(30, {
      message: "First Name must not be longer than 30 characters.",
    }),
  Last_Name: z
    .string()
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last Name must not be longer than 30 characters.",
    }),
  DisplayName: z
    .string()
    .min(2, {
      message: "Display Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Display Name must not be longer than 30 characters.",
    }),
  Email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  RemoteUrl: z.string().url({
    required_error: "Please select a url to use for remote connection.",
  }),
  Theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
});

const EditProfileForm = ({ formId, setOpen }) => {
  const {
    First_Name,
    Last_Name,
    Email,
    DisplayName,
    RemoteUrl,
    Theme,
    updateUserData,
  } = useUserStore();
  const form = useForm({
    resolver: zodResolver(EditProfileFormSchema),
    mode: "onChange",
    defaultValues: {
      First_Name,
      Last_Name,
      Email,
      DisplayName,
      RemoteUrl,
      Theme,
    },
  });

  function onSubmit(data) {
    updateUserData({ isLoggedIn: true, ...data });
    setOpen(false);
    // restart();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-2 gap-y-2"
        id={formId}
      >
        <FormField
          control={form.control}
          name="First_Name"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Last_Name"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@email.com" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Your name and email are kept confidential, only shared when you
                provide feedback.
              </FormDescription>
            </FormItem>
          )}
        />
        <hr className="col-span-2 my-1" />
        <FormField
          control={form.control}
          name="DisplayName"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Might Joe" {...field} />
              </FormControl>
              <FormDescription>
                Enter a display name that you find comfortable.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="RemoteUrl"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Remote Url</FormLabel>
              <FormControl>
                <Input placeholder="https://serialblocks.loca.lt" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Click
                <a href="#" className="text-sky-600">
                  here
                </a>
                to know how to get the remote url
              </FormDescription>
            </FormItem>
          )}
        />
        <hr className="col-span-2 my-1" />

        <FormField
          control={form.control}
          name="Theme"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Theme</FormLabel>
              <FormMessage />
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      className="flex items-center justify-center gap-2"
                      asChild
                    >
                      <div>
                        Light
                        <Sun />
                      </div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      asChild
                      className="flex items-center justify-center gap-2"
                    >
                      <div>
                        Dark
                        <Moon />
                      </div>
                    </Button>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default EditProfileForm;
