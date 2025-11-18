import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { AlertCircleIcon, Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from "@/lib/utils/cn"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Label } from "@/app/components/ui/label"
import { authenticateCredentialsFn, otpAuthSchema } from '@/lib/auth'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { getDeviceFingerprint } from '@/lib/utils/fingerprint'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

export function TwoFactorLoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [err, setErr] = useState('')
  const router = useRouter()
  const loginForm = useForm({
    // validators: {
    //   onSubmit: otpAuthSchema,
    // },
    defaultValues: {
      otp: ''
    },

    onSubmit: async ({ value }) => {
      const fingerprint = await getDeviceFingerprint();
      console.log({ fingerprint })
      // return

      console.log('!!!!!!!!!!!!', value)
      const res = await authenticateCredentialsFn({ data: value })
      if (!res.success) {
        setErr(res.error.message)
      } else {
        router.invalidate()
        navigate({
          to: '/txns'
        })
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
                <h1 className="text-2xl font-bold">Confirmation code</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>

              <div className="grid gap-3">
                {err && <Alert className="bg-card/20" variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Please check your OTP</AlertTitle>
                  <AlertDescription>
                    {err}
                  </AlertDescription>

                </Alert>}
                <Label htmlFor="email">Enter OTP or backup code</Label>
                <loginForm.Field
                  name='otp'
                  validators={{
                    onChange: ({ value }) => {
                      console.log('value.........', value)
                    }
                  }}
                  children={(field) => (
                    <div>
                      <InputOTP
                        onChange={(value) => field.handleChange(value)}
                        value={field.state.value}
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
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
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
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
