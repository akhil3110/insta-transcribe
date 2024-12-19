"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ActionTooltip from "./action-tooltip"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <ActionTooltip
      label={theme === "light" ? "light mode" : "dark mode"}
      side="bottom"
      align="center"
    >
      <Button 
        variant="ghost" 
        size="icon" 
        className="dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-transparent"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>
    </ActionTooltip>
  )
}
