"use client"

import * as ResizablePrimitive from "react-resizable-panels"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

/* ================= PANEL GROUP ================= */

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

/* ================= PANEL ================= */

const ResizablePanel = (
  props: React.ComponentProps<typeof ResizablePrimitive.Panel>
) => <ResizablePrimitive.Panel {...props} />

/* ================= HANDLE ================= */

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<
  typeof ResizablePrimitive.PanelResizeHandle
> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-1 items-center justify-center bg-border",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=vertical]:w-full",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-5 w-4 items-center justify-center rounded-sm border bg-background">
        <GripVertical className="h-3 w-3" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

/* ================= EXPORTS ================= */

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
}
