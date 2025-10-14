"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm",
      "transition-all duration-300 ease-out",
      "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
      "data-[state=open]:bg-background/80 data-[state=open]:shadow-xl data-[state=open]:shadow-black/10",
      "data-[state=open]:border-primary/30",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between px-6 py-5 text-left text-base font-semibold",
        "[&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:duration-300",
        // Add these classes to disable the pseudo-element effect
        "before:!hidden",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        width={20}
        height={20}
        strokeWidth={2}
        className="ml-4 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-[15px] leading-relaxed data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("border-t border-border/30 px-6 pb-6 pt-4 text-muted-foreground", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };