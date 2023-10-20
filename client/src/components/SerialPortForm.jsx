import { useState } from "react";
import {
  Check,
  ChevronsUpDown,
  SearchCheck,
  Search,
  SearchX,
  SearchSlash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useStore } from "@/api/store";
import { Spinner } from "@/components/ui/spinner";

const baudRates = [
  { value: 300, label: "300" },
  { value: 1200, label: "1200" },
  { value: 2400, label: "2400" },
  { value: 4800, label: "4800" },
  { value: 9600, label: "9600" },
  { value: 14400, label: "14400" },
  { value: 19200, label: "19200" },
  { value: 28800, label: "28800" },
  { value: 38400, label: "38400" },
  { value: 57600, label: "57600" },
  { value: 115200, label: "115200" },
];

export function SerialPortForm() {
  const [pathOpen, setPathOpen] = useState(false);
  const [baudRateOpen, setBaudRateOpen] = useState(false);

  const isPortOpen = useStore((store) => store.isPortOpen);
  const isConnecting = useStore((store) => store.isConnecting);
  const serialPorts = useStore((store) => store.serialPorts);

  const { closePort, openPort, listPorts, updateAuth, restart } = useStore(
    (store) => store.serialActions,
  );
  const { updateConfig } = useStore((store) => store.stateActions);
  const form = useForm({
    defaultValues: {
      path: "",
      baudRate: "",
    },
  });
  function onSubmit({ path, baudRate }) {
    if (!isPortOpen) {
      updateConfig({ path, baudRate });
      updateAuth();
      restart();
      openPort();
    } else {
      closePort();
    }
  }

  return true ? (
    <Card className="col-span-6 row-span-6">
      <CardContent className="">
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-5 grid-rows-2 gap-2 "
          >
            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem className="col-span-2 flex flex-col">
                  <Popover open={pathOpen} onOpenChange={setPathOpen}>
                    <PopoverTrigger asChild>
                      <FormControl disabled={!serialPorts?.length}>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={pathOpen}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value && Array.isArray(serialPorts)
                            ? serialPorts.find((serialPort) => {
                                return serialPort.path === field.value;
                              })?.path
                            : "Select serialPort..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-[--radix-popover-trigger-width] p-0">
                      <Command
                        filter={(data, search) => {
                          // whatever value being passed to value prop of commandItem is first converted to a string then
                          // String.prototype.toLowerCase method is called upon it.
                          const { path: value, friendlyname: label } =
                            JSON.parse(data);
                          if (
                            value.startsWith(search) ||
                            label.startsWith(search)
                          )
                            return 1;
                          return 0;
                        }}
                      >
                        <CommandInput placeholder="Search serial ports" />
                        <CommandEmpty>no ports are found</CommandEmpty>
                        <CommandGroup>
                          {Array.isArray(serialPorts) &&
                            serialPorts.map((serialPort) => (
                              <CommandItem
                                key={serialPort.path}
                                value={JSON.stringify({
                                  path: serialPort.path,
                                  friendlyname: serialPort.friendlyName,
                                })}
                                onSelect={() => {
                                  // currentValue is automatically inferred from commandItem TextContent
                                  // also the cmdk searches by the textContent of commandItem if no value prop was provided
                                  // https://github.com/pacocoursey/cmdk#item-cmdk-item-data-disabled-data-selected
                                  // so serialPort.path will be used instead

                                  form.setValue(
                                    "path",
                                    serialPort.path === field.value
                                      ? ""
                                      : serialPort.path,
                                  );
                                  setPathOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-5 w-5",
                                    field.value === serialPort.path
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                <div className="flex flex-col gap-x-2 text-sm ">
                                  <span className="font-medium">
                                    {serialPort.friendlyName || "Unknown"}
                                  </span>
                                  <span>{serialPort.path}</span>
                                </div>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="baudRate"
              render={({ field }) => (
                <FormItem className="col-span-2 flex flex-col">
                  <Popover open={baudRateOpen} onOpenChange={setBaudRateOpen}>
                    <PopoverTrigger asChild>
                      <FormControl disabled={form.watch("path") === ""}>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={baudRateOpen}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? baudRates.find(
                                (baudRate) => baudRate.value === field.value,
                              )?.label
                            : "Select baudRate..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-[--radix-popover-trigger-width] p-0">
                      <Command
                        filter={(value, search) => {
                          if (value.startsWith(search)) return 1;
                          return 0;
                        }}
                      >
                        <CommandInput placeholder="Search BaudRates" />
                        <CommandEmpty>no baudRates are found</CommandEmpty>
                        <CommandGroup>
                          {baudRates.map((baudRate) => (
                            <CommandItem
                              key={baudRate.value}
                              value={baudRate.label}
                              onSelect={() => {
                                form.setValue(
                                  "baudRate",
                                  baudRate.value === field.value
                                    ? ""
                                    : baudRate.value,
                                );
                                setBaudRateOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === baudRate.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {baudRate.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <Button
              className="col-span-1 px-2"
              variant="outline"
              onClick={listPorts}
              type="button"
            >
              {serialPorts === null ? (
                <Search className="mr-2 h-4 w-4" />
              ) : serialPorts?.length > 0 ? (
                <SearchCheck className="mr-2 h-4 w-4" />
              ) : serialPorts?.length === 0 ? (
                <SearchSlash className="mr-2 h-4 w-4" />
              ) : (
                <SearchX className="mr-2 h-4 w-4" />
              )}
              List Ports
            </Button>

            <Button
              disabled={
                form.watch("path") === "" || form.watch("baudRate") === ""
              }
              className="col-span-5"
              type="submit"
            >
              {isConnecting && <Spinner />}
              {isPortOpen ? "Disconnect" : "Connect"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  ) : (
    <p>p</p>
  );
}
