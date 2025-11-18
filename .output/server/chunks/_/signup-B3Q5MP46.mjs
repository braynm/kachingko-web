import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import z from 'zod';
import { useState } from 'react';
import { u as useForm, A as Alert, a as AlertTitle, b as AlertDescription, L as Label } from './alert-yiaBkeOr.mjs';
import { AlertCircleIcon, Check, Loader2 } from 'lucide-react';
import { s as signupFn, c as cn, B as Button } from './ssr.mjs';
import { C as Card, a as CardContent } from './card-CrVZVFlG.mjs';
import { I as Input } from './input-Cp6Zj0xY.mjs';
import { useNavigate, useRouter, Link } from '@tanstack/react-router';
import '@tanstack/form-core';
import '@tanstack/react-store';
import '@radix-ui/react-label';
import 'class-variance-authority';
import '@tanstack/react-query';
import 'tiny-invariant';
import 'tiny-warning';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import '../nitro/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@radix-ui/react-slot';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-dialog';
import '@radix-ui/react-tooltip';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Applicative';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/internal';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Chain';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Compactable';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/ChainRec';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromEither';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Functor';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Separated';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Witherable';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/EitherT';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/Filterable';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromIO';
import '/Users/brymadrid/kachingko/kachingko_web/node_modules/fp-ts/lib/FromTask';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

const signupSchema = z.object({
  email: z.string().email("email doesn't look right"),
  password: z.string().min(3, "password minumum of 3 character(s)"),
  confirmPassword: z.string().min(3, "password minumum of 3 character(s)")
}).refine((data) => data.password === data.confirmPassword, {
  message: "password do not match",
  path: ["confirmPassword"]
  // this makes the error show on confirmPassword
});
function SignupPage({
  className,
  ...props
}) {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const loginForm = useForm({
    validators: {
      onSubmit: signupSchema
    },
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    onSubmit: async ({ value }) => {
      const res = await signupFn({ data: value });
      if (!res.success) {
        setErr(res.error.message);
        setSuccess(false);
      } else {
        setErr("");
        setSuccess(true);
        setTimeout(() => {
          router.invalidate();
          navigate({
            to: "/txns"
          });
        }, 3e3);
      }
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-6", className), ...props, children: [
    /* @__PURE__ */ jsx(Card, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsxs(CardContent, { className: "grid p-0 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            loginForm.handleSubmit();
          },
          className: "p-6 md:p-8",
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Sign up" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-balance", children: "Create your account to start tracking your spending securely." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
              err && /* @__PURE__ */ jsxs(Alert, { className: "bg-card/20", variant: "destructive", children: [
                /* @__PURE__ */ jsx(AlertCircleIcon, {}),
                /* @__PURE__ */ jsx(AlertTitle, { children: "Please check your email/password" }),
                /* @__PURE__ */ jsx(AlertDescription, { children: err })
              ] }),
              success && /* @__PURE__ */ jsxs(Alert, { className: "transition-opacity duration-500 text-green-500", children: [
                /* @__PURE__ */ jsx(Check, { className: "text-green-500" }),
                /* @__PURE__ */ jsx(AlertTitle, { className: "text-green-500", children: "Registed successfully!" }),
                /* @__PURE__ */ jsx(AlertDescription, { className: "text-green-500", children: "You will be redirected shortly." })
              ] }),
              /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
              /* @__PURE__ */ jsx(
                loginForm.Field,
                {
                  name: "email",
                  children: (field) => {
                    var _a;
                    return /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          "aria-invalid": field.state.meta.errors.length > 0,
                          name: field.name,
                          onBlur: field.handleBlur,
                          value: field.state.value,
                          onChange: (e) => field.handleChange(e.target.value),
                          id: "email",
                          type: "text",
                          placeholder: "m@example.com"
                        }
                      ),
                      field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-error text-sm mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
                    ] });
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }) }),
              /* @__PURE__ */ jsx(
                loginForm.Field,
                {
                  name: "password",
                  children: (field) => {
                    var _a;
                    return /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          "aria-invalid": field.state.meta.errors.length > 0,
                          name: field.name,
                          onBlur: field.handleBlur,
                          value: field.state.value,
                          onChange: (e) => field.handleChange(e.target.value),
                          id: "password",
                          type: "password",
                          placeholder: "Password"
                        }
                      ),
                      field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-error text-sm mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
                    ] });
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(Label, { htmlFor: "confirmPassword", children: "Confirm Password" }) }),
              /* @__PURE__ */ jsx(
                loginForm.Field,
                {
                  name: "confirmPassword",
                  children: (field) => {
                    var _a;
                    return /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          "aria-invalid": field.state.meta.errors.length > 0,
                          name: field.name,
                          onBlur: field.handleBlur,
                          value: field.state.value,
                          onChange: (e) => field.handleChange(e.target.value),
                          id: "confirmPassword",
                          type: "password",
                          placeholder: "Confirm Password"
                        }
                      ),
                      field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-error text-sm mt-1", children: (_a = field.state.meta.errors[0]) == null ? void 0 : _a.message })
                    ] });
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              loginForm.Subscribe,
              {
                selector: (state) => [state.canSubmit, state.isSubmitting],
                children: ([canSubmit, isSubmitting]) => /* @__PURE__ */ jsx(Button, { disabled: !canSubmit, type: "submit", className: "w-full cursor-pointer", children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                  "Submitting..."
                ] }) : "Submit" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t", children: /* @__PURE__ */ jsx("span", { className: "bg-card text-muted-foreground relative z-10 px-2", children: "Or continue with" }) }),
            /* @__PURE__ */ jsxs("div", { className: "text-center text-sm", children: [
              "Already have an account?",
              " ",
              /* @__PURE__ */ jsx(Link, { to: "/login", className: "underline underline-offset-4", children: "Login" })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "bg-muted relative hidden md:block", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1657370567512-dcf6c740810e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGNyZWRpdCUyMGNhcmR8ZW58MHx8MHx8fDA%3D",
          alt: "Image",
          className: "absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] "
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4", children: [
      "By clicking continue, you agree to our ",
      /* @__PURE__ */ jsx("a", { href: "#", children: "Terms of Service" }),
      " ",
      "and ",
      /* @__PURE__ */ jsx("a", { href: "#", children: "Privacy Policy" }),
      "."
    ] })
  ] });
}
z.object({
  email: z.string().email("email doesn't look right"),
  password: z.string().min(3, "password minumum of 3 character(s)"),
  confirmPassword: z.string().min(3, "password minumum of 3 character(s)")
}).refine((data) => data.password === data.confirmPassword, {
  message: "password do not match",
  path: ["confirmPassword"]
  // this makes the error show on confirmPassword
});
function RouteComponent() {
  return /* @__PURE__ */ jsx(SignupPage, { className: "w-full" });
}

export { RouteComponent as component };
//# sourceMappingURL=signup-B3Q5MP46.mjs.map
