import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStore } from "@/store/Serialstore";
import { useEffect } from "react";

const SerialSettingsForm = () => {
  const config = useStore((store) => store.config);
  const { dataBits, stopBits, EOL, delimiter, parity, xon, xoff, rtscts } =
    config;

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      dataBits,
      stopBits,
      EOL,
      delimiter,
      parity,
      flowControl: xon && xoff ? "XON/XOFF" : rtscts ? "RTS/CTS" : "",
    },
  });

  function onSubmit(data) {
    // if rts/cts rts/cts is on
    // if xon/xoff xon and xoff on
    // if none all are false by default
    // delimiter
    switch (data.flowControl) {
      case "XON/XOFF":
        data.xon = true;
        data.xoff = true;
        data.rtscts = false;
        break;
      case "RTS/CTS":
        data.rtscts = true;
        data.xon = false;
        data.xoff = false;
        break;
      case "none":
        data.xon = false;
        data.xoff = false;
        data.rtscts = false;
    }
    delete data.flowControl;
    useStore.setState({ config: { config, ...data } });
    // setOpen(false);
  }

  useEffect(() => {
    // TypeScript users
    // const subscription = watch(() => handleSubmit(onSubmit)())
    const subscription = form.watch(form.handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, []);
  return (
    <Form {...form}>
      <form
        noValidate
        // onSubmit={(e) => e.preventDefault()}
        id="SerialSettingsForm"
        className="flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="EOL"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Line ending</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-x-px overflow-hidden rounded-lg border border-border bg-border [&>*]:bg-background"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value="" className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>None</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={"\n"} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>NL</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={"\r"} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>CR</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={"\n\r"} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>NL&CR</div>
                    </Button>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="delimiter"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Delimiter</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-x-px overflow-hidden rounded-lg border border-border bg-border [&>*]:bg-background"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground">
                    <FormControl>
                      <RadioGroupItem value={"\n"} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>NL</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={"\r"} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>CR</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem className="[&_label_div]:first:rounded-lg ">
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={"\r\n"} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>CR&NL</div>
                    </Button>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataBits"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>data bits</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-x-px overflow-hidden rounded-lg border border-border bg-border [&>*]:bg-background"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={5} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>5</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={6} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>6</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={7} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>7</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={8} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>8</div>
                    </Button>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stopBits"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Stop bits</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-x-px overflow-hidden rounded-lg border border-border bg-border [&>*]:bg-background"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={1} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>1</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={1.5} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>1.5</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value={2} className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>2</div>
                    </Button>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parity"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Parity</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-x-px overflow-hidden rounded-lg border border-border bg-border [&>*]:bg-background"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value="" className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>None</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value="odd" className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>Odd</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value="even" className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>Even</div>
                    </Button>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flowControl"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Flow control</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-x-px overflow-hidden rounded-lg border border-border bg-border [&>*]:bg-background"
              >
                <FormItem>
                  <FormLabel className="gap-p h-auto [&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value="" className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>None</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value="XON/XOFF" className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>XON/XOFF</div>
                    </Button>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:bg-accent [&:has([data-state=checked])>div]:text-accent-foreground ">
                    <FormControl>
                      <RadioGroupItem value="RTS/CTS" className="sr-only" />
                    </FormControl>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="rounded-none hover:bg-transparent"
                      asChild
                    >
                      <div>RTS/CTS</div>
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
export default SerialSettingsForm;
