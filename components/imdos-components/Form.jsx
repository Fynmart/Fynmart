"use client";
import React from "react";
import clsx from "clsx";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import {
  Form as FormComponent,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/imdos-ui/form";

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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, CheckIcon, ChevronsUpDown } from "lucide-react";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LoadingButton } from "./LoadingButton";
import { useImdosUI } from "@/providers/ImdosProvider";

const Form = ({ fields, schema, onSubmit, onCancel }) => {
  const { setLoading } = useImdosUI();
  const validation = fields.reduce((acc, field) => {
    acc[field.uid] = field.default;
    return acc;
  }, {});

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: validation,
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    await onSubmit(values);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <FormComponent {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-2"
        >
          {fields.map((item, index) => {
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
                            <SelectValue placeholder={`Select ${item.title}`} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {item.items.map((data, innerIndex) => (
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
                        <PopoverContent className="p-0 sm:w-[460px]">
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
            if (item.type == "file") {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.title}</FormLabel>
                      <FormControl>
                        <Input
                          type={item.type}
                          placeholder={item.title}
                          onChange={(e) => {
                            field.onChange(e.target.files[0]);
                            if (item.onChange) {
                              item.onChange(e.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
            if (item.type == "radio") {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.title}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (item.onChange) {
                              item.onChange(value);
                            }
                          }}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {item.items.map((data, innerIndex) => (
                            <FormItem
                              className="flex items-center space-x-3 space-y-0"
                              key={innerIndex}
                            >
                              <FormControl>
                                <RadioGroupItem value={data.value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {data.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
            if (item.type == "date") {
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
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(value) => {
                              field.onChange(value);
                              if (item.onChange) {
                                item.onChange(value);
                              }
                            }}
                            disabled={item.disabled}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
            if (item.type == "textarea") {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.title}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={item.title}
                          className="resize-none"
                          defaultValue={form.value}
                          onChange={(event) => {
                            const { value } = event.target;
                            field.onChange(value);
                            if (item.onChange) {
                              item.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
            if (item.type == "checkbox") {
              return (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.uid}
                  render={() => (
                    <FormItem>
                      <div className="my-3">
                        <FormLabel>{item.title}</FormLabel>
                        <FormDescription className="text-[12px]">
                          Select the items you want to display in the sidebar.
                        </FormDescription>
                      </div>
                      {item.items.map((data, innerIndex) => (
                        <FormField
                          key={innerIndex}
                          control={form.control}
                          name={item.uid}
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={data.value}
                                className="flex flex-row items-start space-x-3 -space-y-0.5 rounded-md border p-3"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(data.value)}
                                    onCheckedChange={(checked) => {
                                      field.onChange(
                                        checked
                                          ? [...(field.value || []), data.value]
                                          : (field.value || []).filter(
                                              (value) => value !== data.value
                                            )
                                      );
                                      if (item.onChange) {
                                        item.onChange(data.value);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1.5 leading-[20px]">
                                  <FormLabel className="font-normal">
                                    {data.label}
                                  </FormLabel>
                                  {data.description && (
                                    <FormDescription className="text-[12px]">
                                      {data.description}
                                    </FormDescription>
                                  )}
                                </div>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
            return (
              <FormField
                key={index}
                control={form.control}
                name={item.uid}
                render={({ field }) => (
                  <FormItem className={clsx(item.type)}>
                    <FormLabel>{item.title}</FormLabel>
                    <FormControl>
                      <Input
                        type={item.type}
                        placeholder={item.title}
                        defaultValue={field.value}
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value);
                          if (item.onChange) {
                            item.onChange(value);
                          }
                          if (item.slug) {
                            let slug = value.toLowerCase();
                            slug = slug.replace(/[^\w\s-]/g, "");
                            slug = slug.replace(/\s+/g, "-");
                            slug = slug.trim();
                            form.setValue(item.slug.field, slug);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" className="mt-2">
              Submit
            </LoadingButton>
          </div>
        </form>
      </FormComponent>
    </>
  );
};

export default Form;
