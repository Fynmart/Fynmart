import React from "react";
import { CheckIcon, ChevronsUpDown, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/imdos-ui/form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoadingButton } from "./LoadingButton";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useImdosUI } from "@/providers/ImdosProvider";

const FilterForm = ({ filterInputs, handleFormSubmit }) => {
  const { setLoading } = useImdosUI();
  const schema = z.object(
    Object.fromEntries(
      filterInputs.map((field) => [
        field.uid,
        field.optional
          ? z.string().optional()
          : z
              .string()
              .refine((val) => val.length > 0, `${field.title} is required`),
      ])
    )
  );

  const validation = filterInputs.reduce((acc, field) => {
    acc[field.uid] = field.default;
    return acc;
  }, {});

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: validation,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    handleFormSubmit(data);
    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 gap-3",
              filterInputs.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            )}
          >
            {filterInputs.map((item, index) => {
              if (item.type == "dropdown") {
                return (
                  <FormField
                    key={index}
                    control={form.control}
                    name={item.uid}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.title}</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (item.onChange) {
                              item.onChange(value);
                            }
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={`Select ${item.title}`}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {item.items?.map((data, innerIndex) => (
                              <SelectItem value={data.value} key={innerIndex}>
                                {data.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }
              if (item.type == "select") {
                return (
                  <FormField
                    key={index}
                    control={form.control}
                    name={item.uid}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="py-1">{item.title}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? item.items.find(
                                      (innerData) =>
                                        innerData.value === field.value
                                    )?.label
                                  : `Select ${item.title}`}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput placeholder="Search..." />
                              <CommandEmpty>No item found.</CommandEmpty>
                              <CommandGroup>
                                {item.items?.map((data, innerIndex) => (
                                  <CommandItem
                                    value={data.label}
                                    key={innerIndex}
                                    onSelect={() => {
                                      form.setValue(item.uid, data.value);
                                      form.trigger(item.uid);
                                      if (item.onChange) {
                                        item.onChange(data.value);
                                      }
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        data.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {data.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }
            })}
          </div>
          <div className="flex justify-end">
            <LoadingButton className="px-4" type="submit">
              <Search size={25} className="mr-1" /> Search
            </LoadingButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default FilterForm;
