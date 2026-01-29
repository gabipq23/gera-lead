import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Theme, useTheme } from "@/hooks/theme-provider";
import { useCallback } from "react";
import { Tooltip } from "./common/tooltip";

export function ToggleTheme() {
  const { theme: currentTheme, setTheme } = useTheme();

  const changeTheme = useCallback(
    (theme: Theme) => {
      if (currentTheme !== theme) setTheme(theme);
    },
    [currentTheme]
  );

  return (
    <DropdownMenu>
      <Tooltip info="Tema" className="text-slate-200">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Mudar Tema</span>
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeTheme("light")}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="pl-2">Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("dark")}>
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="pl-2">Escuro</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
