import z from 'zod'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { AlertCircleIcon, Check, Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from "@/lib/utils/cn"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Link, useNavigate, useRouter } from '@tanstack/react-router'
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { signupFn } from '../routes/_unathenticated/signup'

const signupSchema = z.object({
  email: z.string().email('email doesn\'t look right'),
  password: z.string().min(3, 'password minumum of 3 character(s)'),
  confirmPassword: z.string().min(3, 'password minumum of 3 character(s)')
}).refine((data) => data.password === data.confirmPassword, {
  message: "password do not match",
  path: ["confirmPassword"], // this makes the error show on confirmPassword
})

export function SignupPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const loginForm = useForm({
    validators: {
      onSubmit: signupSchema,
    },
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },

    onSubmit: async ({ value }) => {
      const res = await signupFn({ data: value })
      if (!res.success) {
        setErr(res.error.message)
        setSuccess(false)
      } else {
        setErr('')
        setSuccess(true)
        setTimeout(() => {
          router.invalidate()
          navigate({
            to: '/txns'
          })
        }, 3000)
      }
    }
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault()
              loginForm.handleSubmit()
            }}
            className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Sign up</h1>
                <p className="text-muted-foreground text-balance">
                  Create your account to start tracking your spending securely.
                </p>
              </div>

              <div className="grid gap-3">
                {err && <Alert className="bg-card/20" variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Please check your email/password</AlertTitle>
                  <AlertDescription>
                    {err}
                  </AlertDescription>

                </Alert>}

                {success && <Alert className="transition-opacity duration-500 text-green-500">
                  <Check className='text-green-500' />
                  <AlertTitle className='text-green-500'>Registed successfully!</AlertTitle>
                  <AlertDescription className='text-green-500'>
                    You will be redirected shortly.
                  </AlertDescription>

                </Alert>}
                <Label htmlFor="email">Email</Label>
                <loginForm.Field
                  name='email'
                  children={(field) => (
                    <div>
                      <Input
                        aria-invalid={field.state.meta.errors.length > 0}
                        name={field.name}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        id="email"
                        type="text"
                        placeholder="m@example.com"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <span className="text-error text-sm mt-1">
                          {field.state.meta.errors[0]?.message as ReactNode}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <loginForm.Field
                  name='password'
                  children={(field) => (
                    <div>
                      <Input
                        aria-invalid={field.state.meta.errors.length > 0}
                        name={field.name}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        id="password"
                        type="password"
                        placeholder='Password'
                      />
                      {field.state.meta.errors.length > 0 && (
                        <span className="text-error text-sm mt-1">
                          {field.state.meta.errors[0]?.message as ReactNode}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <loginForm.Field
                  name='confirmPassword'
                  children={(field) => (
                    <div>
                      <Input
                        aria-invalid={field.state.meta.errors.length > 0}
                        name={field.name}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        id="confirmPassword"
                        type="password"
                        placeholder='Confirm Password'
                      />
                      {field.state.meta.errors.length > 0 && (
                        <span className="text-error text-sm mt-1">
                          {field.state.meta.errors[0]?.message as ReactNode}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
              <loginForm.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button disabled={!canSubmit} type="submit" className="w-full cursor-pointer">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                )}
              />
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={'/login'} className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1657370567512-dcf6c740810e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGNyZWRpdCUyMGNhcmR8ZW58MHx8MHx8fDA%3D"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] "
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
