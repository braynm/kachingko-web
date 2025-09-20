import { useState } from "react"
import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import { Button } from "@/app/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { MessageSquareWarning } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { createNewCardFn } from "@/app/routes/_authenticated/txns/upload"
import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { cn } from "@/lib/utils/cn"

type NewCardProps = {
  queryClient: QueryClient
  bank: string,
  selectNewCard?: (card: CardT) => void
}

const allowedBanks = ["rcbc", "eastwest"] as const
const cardSchema = z.object({
  name: z.string().min(1, "card name is required"),
  bank: z.string().superRefine((val, ctx) => {
    if (!val || val.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "bank is required",
      })
    } else if (!allowedBanks.includes(val.toLowerCase() as any)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "unsupported bank",
      })
    }
  }),
})


type CardT = { id: string; bank: string; name: string }
type CardsT = { success: true, data: Array<CardT> }

const defer = (fn: () => void) => setTimeout(fn, 0)

export function NewCard(props: NewCardProps) {
  const queryClient = useQueryClient()
  const [err, setErr] = useState('')
  const { bank, selectNewCard } = props
  const form = useForm({
    defaultValues: {
      bank: bank ?? "",
      name: "",
    },
    validators: { onSubmit: cardSchema },
    onSubmit: async ({ value }) => {
      const response = await createNewCardFn({ data: value })
      if (response.success) {
        queryClient.setQueryData<CardsT>(
          ["cards"],
          (old) => {
            if (!old) {
              return { success: true, data: [response.data] }
            }
            return {
              ...old,
              data: [...old.data, response.data],
            }
          }
        )

        if (selectNewCard) {
          // selectNewCard(response.data)
          defer(() => selectNewCard(response.data))
        }
      } else {
        setErr(response.error.message)
      }
      return response

    },

  })
  return (

    <div>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}>
          <DialogHeader className="mb-10">
            <DialogTitle>Create a New Card</DialogTitle>
            <DialogDescription>
              Add a new card so we can keep your transactions in check and give you better insights.

            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              {err && <Alert className="bg-card/20" variant="destructive">
                <MessageSquareWarning className="h-6 w-6" />
                <AlertTitle>Please check your input fields</AlertTitle>
                <AlertDescription>
                  {err}
                </AlertDescription>

              </Alert>}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="bank-1">Bank</Label>
              <form.Field
                name="bank"
                children={(field) => <div>
                  <Input
                    type="hidden"
                    id="bank-1"
                    name={field.name}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                  />
                  <Select
                    value={field.state.value}
                    onOpenChange={field.handleBlur}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger id="card" className={cn(
                      "w-full",
                      field.state.meta.errors.length > 0 && "border-destructive"
                    )}>
                      <SelectValue placeholder="Select Card" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='eastwest'>EastWest</SelectItem>
                      <SelectItem value='rcbc'>RCBC</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-error text-sm mt-1">
                      {field.state.meta.errors[0]?.message}
                    </span>
                  )}
                </div>}

              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="card-1">Card Name</Label>
              <form.Field
                name="name"
                children={(field) => <div>
                  <Input
                    type="text"
                    id="card-name-1"
                    name={field.name}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-error text-sm mt-1">
                      {field.state.meta.errors[0]?.message}
                    </span>
                  )}
                </div>}

              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit">Save Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </div>
  )
}

