import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import z$1, { z } from 'zod';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery, queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { u as useForm, A as Alert, a as AlertTitle, b as AlertDescription, L as Label } from './alert-yiaBkeOr.mjs';
import { CheckIcon, ArrowUpRight, AlertCircleIcon, Plus, Upload, FileSpreadsheet, Check, Save, HelpCircle, RotateCcw, MessageSquareWarning, XIcon } from 'lucide-react';
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from './card-CrVZVFlG.mjs';
import { I as Input } from './input-Cp6Zj0xY.mjs';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as SelectSeparator } from './select-SD1OuLj3.mjs';
import { M as uploadTxnsFn, c as cn, N as TooltipProvider, O as Tooltip, P as TooltipTrigger, B as Button, Q as TooltipContent, U as listUserCardsFn, L as createNewCardFn } from './ssr.mjs';
import * as SheetPrimitive from '@radix-ui/react-dialog';

function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            SheetPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const allowedBanks = ["rcbc", "eastwest"];
const cardSchema = z.object({
  name: z.string().min(1, "card name is required"),
  bank: z.string().superRefine((val, ctx) => {
    if (!val || val.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "bank is required"
      });
    } else if (!allowedBanks.includes(val.toLowerCase())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "unsupported bank"
      });
    }
  })
});
const defer = (fn) => setTimeout(fn, 0);
function NewCard(props) {
  const queryClient = useQueryClient();
  const [err, setErr] = useState("");
  const { bank, selectNewCard } = props;
  const form = useForm({
    defaultValues: {
      bank: bank != null ? bank : "",
      name: ""
    },
    validators: { onSubmit: cardSchema },
    onSubmit: async ({ value }) => {
      const response = await createNewCardFn({ data: value });
      if (response.success) {
        queryClient.setQueryData(
          ["cards"],
          (old) => {
            if (!old) {
              return { success: true, data: [response.data] };
            }
            return {
              ...old,
              data: [...old.data, response.data]
            };
          }
        );
        if (selectNewCard) {
          defer(() => selectNewCard(response.data));
        }
      } else {
        setErr(response.error.message);
      }
      return response;
    }
  });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(DialogContent, { className: "sm:max-w-[425px]", children: /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    form.handleSubmit();
  }, children: [
    /* @__PURE__ */ jsxs(DialogHeader, { className: "mb-10", children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Create a New Card" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Add a new card so we can keep your transactions in check and give you better insights." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsx("div", { children: err && /* @__PURE__ */ jsxs(Alert, { className: "bg-card/20", variant: "destructive", children: [
        /* @__PURE__ */ jsx(MessageSquareWarning, { className: "h-6 w-6" }),
        /* @__PURE__ */ jsx(AlertTitle, { children: "Please check your input fields" }),
        /* @__PURE__ */ jsx(AlertDescription, { children: err })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "bank-1", children: "Bank" }),
        /* @__PURE__ */ jsx(
          form.Field,
          {
            name: "bank",
            children: (field) => {
              var _a;
              return /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "hidden",
                    id: "bank-1",
                    name: field.name,
                    onChange: (e) => field.handleChange(e.target.value),
                    onBlur: field.handleBlur,
                    value: field.state.value
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Select,
                  {
                    value: field.state.value,
                    onOpenChange: field.handleBlur,
                    onValueChange: field.handleChange,
                    children: [
                      /* @__PURE__ */ jsx(SelectTrigger, { id: "card", className: cn(
                        "w-full",
                        field.state.meta.errors.length > 0 && "border-destructive"
                      ), children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select Card" }) }),
                      /* @__PURE__ */ jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsx(SelectItem, { value: "eastwest", children: "EastWest" }),
                        /* @__PURE__ */ jsx(SelectItem, { value: "rcbc", children: "RCBC" })
                      ] })
                    ]
                  }
                ),
                field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-error text-sm mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
              ] });
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "card-1", children: "Card Name" }),
        /* @__PURE__ */ jsx(
          form.Field,
          {
            name: "name",
            children: (field) => {
              var _a;
              return /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "text",
                    id: "card-name-1",
                    name: field.name,
                    onChange: (e) => field.handleChange(e.target.value),
                    onBlur: field.handleBlur,
                    value: field.state.value,
                    "aria-invalid": field.state.meta.errors.length > 0
                  }
                ),
                field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-error text-sm mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
              ] });
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4", children: [
      /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { className: "cursor-pointer", variant: "outline", children: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { className: "cursor-pointer", type: "submit", children: "Save Card" })
    ] })
  ] }) }) });
}
const uploadSchema = z$1.object({
  password: z$1.string().nonempty("password is required"),
  card: z$1.string().nonempty("credit card is required"),
  bank: z$1.string().nonempty("bank is required"),
  file: z$1.instanceof(File, { message: "statement pdf is required" })
});
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};
const listUserCardsOptions = queryOptions({
  queryKey: ["cards"],
  queryFn: async () => {
    return listUserCardsFn();
  }
});
const formatBank = (name) => {
  const banks = {
    eastwest: "EastWest",
    rcbc: "RCBC"
  };
  return banks[name] || name;
};
function TxnUploadPage({ queryClient }) {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [createCardOpened, setCreateCardOpened] = useState(false);
  const [fileMetadata, setFileMetadata] = useState(null);
  const listCardsQuery = useQuery(listUserCardsOptions);
  const uploadMutation = useMutation({
    mutationFn: (formData) => uploadTxnsFn({ data: formData }),
    onMutate: () => {
      setFileMetadata((prev) => prev ? { ...prev, status: "uploading" } : null);
    },
    onSuccess: (response) => {
      setFileMetadata((prev) => prev ? { ...prev, status: "completed" } : null);
      if (response.success) {
        const { data } = response;
        const message = `Importing ${data.length} transaction(s) success!`;
        setSuccess(message);
        setErr("");
      } else {
        setSuccess("");
        setErr(response.error.message);
      }
    },
    onError: (error) => {
      setFileMetadata((prev) => prev ? { ...prev, status: "error" } : null);
      setErr("Something went wrong. Please try again later.");
      setSuccess("");
    }
  });
  const form = useForm({
    validators: {
      onSubmit: uploadSchema
    },
    defaultValues: {
      password: "",
      card: "",
      bank: "",
      file: void 0
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("file", value.file);
      formData.append("card_id", value.card);
      formData.append("pdf_pw", value.password);
      formData.append("bank", value.bank);
      setFileMetadata((prev) => prev ? { ...prev, status: "uploading" } : null);
      uploadMutation.mutate(formData);
    }
  });
  const handleFileChange = (file) => {
    if (file) {
      const metadata = {
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        lastModified: new Date(file.lastModified).toLocaleDateString(),
        status: "pending"
      };
      setFileMetadata(metadata);
      setErr("");
      setSuccess("");
    } else {
      setFileMetadata(null);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto ", children: /* @__PURE__ */ jsxs(Dialog, { open: createCardOpened, onOpenChange: setCreateCardOpened, children: [
    /* @__PURE__ */ jsx(
      NewCard,
      {
        queryClient,
        selectNewCard: (card) => {
          setCreateCardOpened(false);
          form.setFieldValue("card", card.id);
          form.setFieldValue("bank", card.bank.toLowerCase());
        },
        bank: form.getFieldValue("bank")
      }
    ),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "text-left", children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-between mb-4", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Import Transactions" }) }),
          success && /* @__PURE__ */ jsxs(Alert, { className: "transition-opacity duration-500 text-green-500", children: [
            /* @__PURE__ */ jsx(CheckIcon, {}),
            /* @__PURE__ */ jsx(AlertTitle, { className: "text-green-500", children: "File Upload success!" }),
            /* @__PURE__ */ jsxs(AlertDescription, { className: "text-green-500", children: [
              /* @__PURE__ */ jsx("p", { children: success }),
              /* @__PURE__ */ jsxs(Link, { target: "__blank", to: "/txns", className: "flex justify-center items-center mt-2 font-medium underline text-blue-500", children: [
                "View Transactions",
                /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4" })
              ] })
            ] })
          ] }),
          err && /* @__PURE__ */ jsxs(Alert, { className: "transition-opacity duration-500", variant: "destructive", children: [
            /* @__PURE__ */ jsx(AlertCircleIcon, {}),
            /* @__PURE__ */ jsx(AlertTitle, { children: "File Upload failed" }),
            /* @__PURE__ */ jsx(AlertDescription, { children: err })
          ] })
        ] }),
        /* @__PURE__ */ jsx(CardDescription, {})
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "sm:mx-auto sm:max-w-lg flex items-center justify-center py-5 w-full max-w-lg", children: /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        form.handleSubmit();
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 mb-4", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "mb-2", children: "Bank *" }),
          /* @__PURE__ */ jsx(
            form.Field,
            {
              name: "bank",
              children: (field) => {
                var _a;
                return /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "bank",
                      type: "hidden",
                      placeholder: "Select Bank",
                      "aria-invalid": field.state.meta.errors.length > 0,
                      onChange: (e) => field.handleChange(e.target.value),
                      value: field.state.value
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Select,
                    {
                      value: field.state.value,
                      onOpenChange: field.handleBlur,
                      onValueChange: field.handleChange,
                      children: [
                        /* @__PURE__ */ jsx(SelectTrigger, { id: "card", className: cn(
                          "w-full",
                          field.state.meta.errors.length > 0 && "border-destructive"
                        ), children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select Card" }) }),
                        /* @__PURE__ */ jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsx(SelectItem, { value: "eastwest", children: "EastWest" }),
                          /* @__PURE__ */ jsx(SelectItem, { value: "rcbc", children: "RCBC" })
                        ] })
                      ]
                    }
                  ),
                  field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-error text-sm mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
                ] });
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "mb-2", children: "File Password *" }),
            /* @__PURE__ */ jsx(
              form.Field,
              {
                name: "password",
                children: (field) => {
                  var _a;
                  return /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        name: field.name,
                        id: "password",
                        type: "password",
                        placeholder: "PDF Password",
                        "aria-invalid": field.state.meta.errors.length > 0,
                        onChange: (e) => field.handleChange(e.target.value),
                        onBlur: field.handleBlur,
                        value: field.state.value
                      }
                    ),
                    field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-error text-sm mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
                  ] });
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "card", className: "mb-2", children: "Credit Card*" }),
            /* @__PURE__ */ jsx(
              form.Field,
              {
                name: "card",
                children: (field) => {
                  var _a, _b, _c;
                  return /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "hidden",
                        name: field.name,
                        id: "card",
                        value: field.state.value
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      Select,
                      {
                        value: field.state.value,
                        onOpenChange: field.handleBlur,
                        onValueChange: (v) => {
                          if (v == "new") {
                            setCreateCardOpened(true);
                          }
                          field.handleChange(v);
                        },
                        children: [
                          /* @__PURE__ */ jsx(SelectTrigger, { id: "card", className: cn(
                            "w-full",
                            field.state.meta.errors.length > 0 && "border-destructive"
                          ), children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select Card" }) }),
                          /* @__PURE__ */ jsxs(SelectContent, { children: [
                            ((_a = listCardsQuery.data) == null ? void 0 : _a.success) && ((_b = listCardsQuery.data) == null ? void 0 : _b.data.map(
                              (item) => /* @__PURE__ */ jsx(SelectItem, { value: item.id, children: `${formatBank(item.bank)} ${item.name}` }, item.id)
                            )),
                            /* @__PURE__ */ jsx(SelectSeparator, {}),
                            /* @__PURE__ */ jsx(SelectItem, { className: "cursor-pointer", value: "new", children: /* @__PURE__ */ jsxs("div", { className: "hover:text-background text-muted-foreground flex items-center justify-center gap-1", children: [
                              /* @__PURE__ */ jsx(Plus, { className: "hover:text-background  h-4 w-4" }),
                              /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx("span", { className: "", children: "Add New Card" }) })
                            ] }) })
                          ] })
                        ]
                      }
                    ),
                    field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-error text-sm mt-1", children: (_c = field.state.meta.errors[0]) == null ? void 0 : _c.message })
                  ] });
                }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(Label, { htmlFor: "file", className: "mb-2", children: "File Upload*" }),
        /* @__PURE__ */ jsx(
          form.Field,
          {
            name: "file",
            children: (field) => {
              var _a;
              return /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: cn(
                  "mt-4 flex justify-center space-x-4 rounded-md border border-dashed border-primary px-6 py-10",
                  field.state.meta.errors.length > 0 && "border-destructive"
                ), children: /* @__PURE__ */ jsxs("div", { className: "sm:flex sm:items-center sm:gap-x-3", children: [
                  /* @__PURE__ */ jsx(
                    Upload,
                    {
                      className: "mx-auto h-8 w-8 text-muted-foreground sm:mx-0 sm:h-6 sm:w-6",
                      "aria-hidden": true
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "mt-4 flex text-sm leading-6 text-foreground sm:mt-0", children: [
                    /* @__PURE__ */ jsxs(
                      Label,
                      {
                        htmlFor: "file",
                        className: "relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:underline hover:underline-offset-4",
                        children: [
                          /* @__PURE__ */ jsx("span", { children: "choose file" }),
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              accept: "application/pdf",
                              id: "file",
                              name: "file-upload-4",
                              type: "file",
                              className: "sr-only",
                              onChange: (e) => {
                                var _a2, _b;
                                handleFileChange((_a2 = e.target.files) == null ? void 0 : _a2[0]);
                                field.handleChange((_b = e.target.files) == null ? void 0 : _b[0]);
                              }
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "pl-1", children: "to upload" })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 flex items-center justify-between text-xs leading-5 text-muted-foreground", children: "Recommended max. size: 10 MB, Accepted file types: PDF." }),
                field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-error text-sm mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
              ] });
            }
          }
        ),
        fileMetadata && /* @__PURE__ */ jsxs("div", { className: "relative mt-8 rounded-lg bg-muted p-3", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute right-1 top-1" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2.5", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-background shadow-sm ring-1 ring-inset ring-input", children: /* @__PURE__ */ jsx(
              FileSpreadsheet,
              {
                className: "size-5 text-foreground",
                "aria-hidden": true
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-foreground", children: fileMetadata.name }),
              /* @__PURE__ */ jsxs("div", { className: "mt-0.5 flex justify-between text-xs ", children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: fileMetadata.size }),
                fileMetadata.status === "completed" && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center text-green-500 ", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "Completed" })
                ] }),
                ["pending", "uploading"].includes(fileMetadata.status) && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center text-yellow-700 ", children: [
                  /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "Pending" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-16", children: [
          /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
            /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "flex items-center text-muted-foreground hover:text-foreground hover:bg-muted ",
                children: [
                  /* @__PURE__ */ jsx(HelpCircle, { className: "h-4 w-4 mr-1" }),
                  "Security?"
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(TooltipContent, { className: "py-3 bg-background text-foreground border", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[13px] font-medium", children: "How We Handle Your PDF File" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground dark:text-muted-background text-xs max-w-[200px]", children: "We only extract your transactions (date, merchant, amount), and if your PDF has a password, it\u2019s just used to open the file and never saved. The file is also deleted right after parsing." })
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end space-x-3", children: /* @__PURE__ */ jsxs("div", { children: [
            (fileMetadata == null ? void 0 : fileMetadata.status) !== "uploading" && /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                variant: "default",
                className: "cursor-pointer whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90",
                children: "Upload"
              }
            ),
            (fileMetadata == null ? void 0 : fileMetadata.status) === "uploading" && /* @__PURE__ */ jsxs(
              Button,
              {
                type: "submit",
                disabled: true,
                className: "whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90",
                children: [
                  /* @__PURE__ */ jsx(RotateCcw, { className: "animate-spin h-4 w-4" }),
                  "Uploading..."
                ]
              }
            )
          ] }) })
        ] })
      ] }) }) })
    ] })
  ] }) });
}

export { TxnUploadPage as T };
//# sourceMappingURL=index-DK8pgixo.mjs.map
