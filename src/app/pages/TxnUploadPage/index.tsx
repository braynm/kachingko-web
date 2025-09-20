import z from "zod"
import { useState } from "react"
import { Link } from '@tanstack/react-router'
import { QueryClient, queryOptions, useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "@tanstack/react-form"
import { AlertCircleIcon, ArrowUpRight, Check, CheckIcon, FileSpreadsheet, HelpCircle, Plus, RotateCcw, Save, Upload, X } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator
} from "@/app/components/ui/select"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/app/components/ui/tooltip"
import { Button } from "@/app/components/ui/button"
import { cn } from "@/lib/utils/cn"
import { listUserCardsFn, uploadTxnsFn } from "@/app/routes/_authenticated/txns/upload"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog"
import { NewCard } from "./components/NewCard"

interface FileMetadata {
  file: File
  name: string
  size: string
  type: string
  lastModified: string
  status: 'pending' | 'uploading' | 'completed' | 'error'
}


const uploadSchema = z.object({
  password: z.string().nonempty('password is required'),
  card: z.string().nonempty('credit card is required'),
  bank: z.string().nonempty('bank is required'),
  file: z.instanceof(File, { message: 'statement pdf is required' }),
})

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}


const listUserCardsOptions = queryOptions({
  queryKey: ['cards'],
  queryFn: async () => {
    return listUserCardsFn()
  }
})

export const formatBank = (name: string) => {
  const banks = {
    eastwest: 'EastWest',
    rcbc: 'RCBC'
  }

  return banks[name] || name
}

export function TxnUploadPage({ queryClient }: { queryClient: QueryClient }) {
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const [createCardOpened, setCreateCardOpened] = useState(false)
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null)

  const listCardsQuery = useQuery(listUserCardsOptions)
  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) => uploadTxnsFn({ data: formData }),
    onMutate: () => {
      // Set uploading status when mutation starts
      setFileMetadata(prev => prev ? { ...prev, status: 'uploading' } : null)
    },
    onSuccess: (response) => {
      // Set completed status on success
      setFileMetadata(prev => prev ? { ...prev, status: 'completed' } : null)
      if (response.success) {
        const { data } = response
        const message = `Importing ${data.length} transaction(s) success!`
        setSuccess(message)
        setErr('')
      } else {
        setSuccess('')
        setErr(response.error.message)
      }

    },
    onError: (error) => {
      // Set error status on failure
      setFileMetadata(prev => prev ? { ...prev, status: 'error' } : null)
      setErr('Something went wrong. Please try again later.')
      setSuccess('')
    }
  })

  const form = useForm({
    validators: {
      onSubmit: uploadSchema
    },
    defaultValues: {
      password: '',
      card: '',
      bank: '',
      file: undefined as File | undefined
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData()

      formData.append('file', value.file as File)
      formData.append('card_id', value.card)
      formData.append('pdf_pw', value.password)
      formData.append('bank', value.bank)

      setFileMetadata(prev => prev ? { ...prev, status: 'uploading' } : null)
      uploadMutation.mutate(formData)
    },

  })


  // side effect for extracting file metadata
  const handleFileChange = (file: File | undefined) => {
    if (file) {
      const metadata: FileMetadata = {
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        lastModified: new Date(file.lastModified).toLocaleDateString(),
        status: 'pending'
      }
      setFileMetadata(metadata)
      setErr('')
      setSuccess('')
    } else {
      setFileMetadata(null)
    }
  }

  return (
    <div className='container mx-auto '>
      <Dialog open={createCardOpened} onOpenChange={setCreateCardOpened}>
        <NewCard
          queryClient={queryClient}
          selectNewCard={(card) => {
            setCreateCardOpened(false)
            form.setFieldValue('card', card.id)
            form.setFieldValue('bank', card.bank.toLowerCase())

          }}
          bank={form.getFieldValue('bank')}
        />
        <Card>
          <CardHeader className='text-left'>
            <CardTitle className="">
              <div className='flex justify-between mb-4'>
                <h1 className='text-2xl font-bold'>Import Transactions</h1>
              </div>
              {success && <Alert className="transition-opacity duration-500 text-green-500">
                <CheckIcon />
                <AlertTitle className="text-green-500">File Upload success!</AlertTitle>
                <AlertDescription className="text-green-500">
                  <p>
                    {success}
                  </p>
                  <Link target='__blank' to={'/txns'} className='flex justify-center items-center mt-2 font-medium underline text-blue-500'>
                    View Transactions
                    <ArrowUpRight className='h-4 w-4' />
                  </Link>
                </AlertDescription>
              </Alert>}

              {err && <Alert className="transition-opacity duration-500" variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>File Upload failed</AlertTitle>
                <AlertDescription>
                  {err}
                </AlertDescription>
              </Alert>}
            </CardTitle>
            <CardDescription>

            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="sm:mx-auto sm:max-w-lg flex items-center justify-center py-5 w-full max-w-lg">
              <form onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                form.handleSubmit()
              }}>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <Label htmlFor="password" className="mb-2">
                      Bank *
                    </Label>
                    <form.Field
                      name="bank"
                      children={(field) =>
                        <div>
                          <Input
                            id="bank"
                            type="hidden"
                            placeholder="Select Bank"
                            aria-invalid={field.state.meta.errors.length > 0}
                            onChange={e => field.handleChange(e.target.value)}
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
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="password" className="mb-2">
                      File Password *
                    </Label>
                    <form.Field
                      name="password"
                      children={(field) =>
                        <div>
                          <Input
                            name={field.name}
                            id="password"
                            type="password"
                            placeholder="PDF Password"

                            aria-invalid={field.state.meta.errors.length > 0}
                            onChange={e => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            value={field.state.value}
                          />
                          {field.state.meta.errors.length > 0 && (
                            <span className="text-error text-sm mt-1">
                              {field.state.meta.errors[0]?.message}
                            </span>
                          )}
                        </div>
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="card" className="mb-2">
                      Credit Card*
                    </Label>
                    <form.Field
                      name="card"
                      children={(field) => (
                        <div>
                          <input
                            type="hidden"
                            name={field.name}
                            id="card"
                            value={field.state.value}
                          />
                          <Select
                            value={field.state.value}
                            onOpenChange={field.handleBlur}
                            onValueChange={v => {
                              if (v == 'new') {
                                setCreateCardOpened(true)
                              }
                              field.handleChange(v)
                            }}
                          >
                            <SelectTrigger id="card" className={cn(
                              "w-full",
                              field.state.meta.errors.length > 0 && "border-destructive"
                            )}>
                              <SelectValue placeholder="Select Card" />
                            </SelectTrigger>
                            <SelectContent>
                              {listCardsQuery.data?.success && listCardsQuery.data?.data.map(item =>
                                <SelectItem key={item.id} value={item.id}>{`${formatBank(item.bank)} ${item.name}`}</SelectItem>
                              )}
                              <SelectSeparator />
                              <SelectItem className="cursor-pointer" value="new">
                                <div className="hover:text-background text-muted-foreground flex items-center justify-center gap-1">
                                  <Plus className="hover:text-background  h-4 w-4" />
                                  <DialogTrigger asChild>
                                    <span className="">Add New Card</span>
                                  </DialogTrigger>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {field.state.meta.errors.length > 0 && (
                            <span className="text-error text-sm mt-1">
                              {field.state.meta.errors[0]?.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
                <Label htmlFor="file" className="mb-2">
                  File Upload*
                </Label>
                <form.Field
                  name="file"
                  children={(field) => (
                    <>

                      <div className={cn(
                        "mt-4 flex justify-center space-x-4 rounded-md border border-dashed border-primary px-6 py-10",
                        field.state.meta.errors.length > 0 && "border-destructive"
                      )}>
                        <div className="sm:flex sm:items-center sm:gap-x-3">
                          <Upload
                            className="mx-auto h-8 w-8 text-muted-foreground sm:mx-0 sm:h-6 sm:w-6"
                            aria-hidden={true}
                          />
                          <div className="mt-4 flex text-sm leading-6 text-foreground sm:mt-0">
                            <Label
                              htmlFor="file"
                              className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4"
                            >
                              <span>choose file</span>
                              <input
                                accept="application/pdf"
                                id="file"
                                name="file-upload-4"
                                type="file"
                                className="sr-only"
                                onChange={e => {
                                  handleFileChange(e.target.files?.[0])
                                  field.handleChange(e.target.files?.[0])
                                }}
                              />
                            </Label>
                            <p className="pl-1">to upload</p>
                          </div>


                        </div>
                      </div>
                      <p className="mt-2 flex items-center justify-between text-xs leading-5 text-muted-foreground">
                        Recommended max. size: 10 MB, Accepted file types: PDF.
                      </p>
                      {field.state.meta.errors.length > 0 && (
                        <span className="text-error text-sm mt-1">
                          {field.state.meta.errors[0]?.message}
                        </span>
                      )}
                    </>
                  )}
                />

                {fileMetadata && <div className="relative mt-8 rounded-lg bg-muted p-3">
                  <div className="absolute right-1 top-1">
                    {/* Temporarily hide close button; TODO: implement remove file */}
                    {/* <Button */}
                    {/*   type="button" */}
                    {/*   variant="ghost" */}
                    {/*   size="sm" */}
                    {/*   className="rounded-sm p-2 text-muted-foreground hover:text-foreground" */}
                    {/*   aria-label="Remove" */}
                    {/* > */}
                    {/*   <X className="size-4 shrink-0" aria-hidden={true} /> */}
                    {/* </Button> */}
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-inset ring-input">
                      <FileSpreadsheet
                        className="size-5 text-foreground"
                        aria-hidden={true}
                      />
                    </span>
                    <div className="w-full">
                      <p className="text-xs font-medium text-foreground">
                        {fileMetadata.name}
                      </p>
                      <div className="mt-0.5 flex justify-between text-xs ">
                        <span className="text-muted-foreground">{fileMetadata.size}</span>
                        {fileMetadata.status === 'completed' && <div className="flex items-center justify-center text-green-500 ">
                          <Check className="w-4 h-4" />
                          <span>Completed</span>
                        </div>}

                        {['pending', 'uploading'].includes(fileMetadata.status) && <div className="flex items-center justify-center text-yellow-700 ">
                          <Save className="w-4 h-4" />
                          <span>Pending</span>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>}
                <div className="flex justify-between mt-16">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip >
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center text-muted-foreground hover:text-foreground hover:bg-muted "
                        >
                          <HelpCircle className="h-4 w-4 mr-1" />
                          Security?
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="py-3 bg-background text-foreground border">
                        <div className="space-y-1">
                          <p className="text-[13px] font-medium">How We Handle Your PDF File</p>
                          <p className="text-muted-foreground dark:text-muted-background text-xs max-w-[200px]">
                            We only extract your transactions (date, merchant, amount), and if your PDF has a password, it’s just used to open the file and never saved. The file is also deleted right after parsing.
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="flex items-center justify-end space-x-3">
                    <div>
                      {fileMetadata?.status !== 'uploading' && <Button
                        type="submit"
                        variant="default"
                        className="cursor-pointer whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                      >
                        Upload
                      </Button>}
                      {fileMetadata?.status === 'uploading' && <Button
                        type="submit"
                        disabled
                        className="whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                      >
                        <RotateCcw className="animate-spin h-4 w-4" />
                        Uploading...
                      </Button>}
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  )
}

