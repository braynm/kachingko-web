
import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Link } from "@tanstack/react-router"
import { BanknoteArrowUpIcon, BookText, FileImage, NotebookPen, Upload } from "lucide-react"


export function ImportTransactionButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="cursor-pointer">
          <BanknoteArrowUpIcon />
          Import Transactions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/txns/upload" className="flex items-center gap-2 w-full">
            <BookText className="dark:hover:text-background" />
            PDF
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileImage className="dark:hover:text-background" />
          Screenshot
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NotebookPen className="dark:hover:text-background" />
          Manual
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
