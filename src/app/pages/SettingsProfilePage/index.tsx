import { Clipboard, Copy, Key, Lock, Shield, ShieldPlus, UserPen } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import QRCode from "react-qr-code"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/app/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

export function SettingsProfilePage() {
  return (
    <div className="min-w-2xl">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" className="cursor-pointer">
            <UserPen />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="cursor-pointer">
            <Lock />
            Security
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">First Name</Label>
                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account's security and keep your data safe.</CardDescription>
            </CardHeader>
            <CardContent className="gap-6">
              <div className="flex flex-col mt-3 gap-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-semibold">Two-Factor Authentication</h2>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <div>
                    <Button size='sm' className="cursor-pointer">
                      <Shield />
                      Enable
                    </Button>
                  </div>

                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-semibold">Change Password</h2>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <div>
                    <Button size='sm' className="cursor-pointer">
                      <Key />
                      Change
                    </Button>
                  </div>

                </div>
              </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Recent Logins</CardTitle>
              <CardDescription>Check for any unusual activity or unrecognized devices.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <h2 className="text-sm font-semibold">MacOS Firefox</h2>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold">Windows Chrome</h2>
                <p className="text-sm text-muted-foreground">1 month ago</p>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>This will permanently delete your account and its associated data. Please note this action is irreversible, so proceed with caution.</CardDescription>
            </CardHeader>
            <CardContent className="ml-auto">
              <Button className="cursor-pointer" variant='destructive'>Delete account</Button>
            </CardContent>
          </Card>

          <Card className="mb-5">
            <CardContent className="flex flex-col gap-2">
              <div>
                <h2 className="text-medium font-semibold">Protect your Account</h2>
                <p className="text-muted-foreground">Add an extra layer of protection for your spending data</p>
              </div>
              <ul className="list-disc ml-5 mb-5">
                <li>Link a supported authentication app to your KachingKo account (e.g. Google Authenticator, Authy, 1Password, LastPass etc.)</li>
                <li>Enter the confirmation code</li>
                <li>Copy and save your backup codes</li>
              </ul>
              <Button className="w-full cursor-pointer">Get Started</Button>
            </CardContent>
          </Card>
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Protect your Account</CardTitle>
              <CardDescription>Add an extra layer of protection to your data</CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="" style={{ padding: '16px' }}>
                <QRCode
                  style={{ margin: 'auto', height: "auto", maxWidth: "100%", width: "35%" }}
                  value={'otpauth://totp/KachingKoAPP:bryanfmadrid@gmail.com?secret=QMZBWTDHYZUJDXHHDYGWQIX7Y66G3MZH&issuer=KachingKoAPP'}
                  bgColor="transparent"
                  viewBox={`0 0 256 256`}
                />
              </div>
              {/* <p className="text-center text-sm text-medium">Can't scan QR Code? Enter this code into your authentication app instead:</p> */}
              {/* <p className="text-center text-medium font-semibold">QMZBWTDHYZUJDXHHDYGWQIX7Y66G3MZH</p> */}
              {/* <p className="text-muted-foreground cursor-pointer flex items-center gap-1 justify-center"> */}
              {/*   <Copy className="w-4 h-4" /> */}
              {/*   Copy */}
              {/* </p> */}
            </CardContent>
            <CardFooter className="m-auto">
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Verify Code</CardTitle>
              <CardDescription>Enter the confirmation code</CardDescription>
            </CardHeader>
            <CardContent className="">
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

