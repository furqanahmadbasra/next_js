"use client"

import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { chagneOrderStatus } from "./actions";
import { useRouter } from "next/navigation";

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  awaiting_shipment: "Awaiting shipment",
  fulfilled: "Full filled",
  shipped: "Shipped",
};
const StatusDropDown = ({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: chagneOrderStatus,
    onSuccess: () => router.refresh(),
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-52 flex justify-between items-center"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {Object.keys(OrderStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              "flex text-sm gap-1 items-center o-2.5 cursor-default hover:bg-zinc-100",
              {
                "bg-zinc-100": orderStatus === status,
              }
            )}
            onClick={() => mutate({ id, newStatus: status as OrderStatus })}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4 text-primary",
                orderStatus === status ? "opacity-100" : "opacity-0"
              )}
            />

            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropDown;
