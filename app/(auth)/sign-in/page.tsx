"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"

const  SignUp = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {

  console.log(process.env.NEXT_PUBLIC_CALLBACK_URL_AFTER_SIGN_IN)
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="flex flex-col gap-y-4 mt-4">
              <Button 
                  onClick={() => {signIn("google", {callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL_AFTER_SIGN_IN})}} 
                  variant="outline" 
                  className="w-full"
                >
                  <img src="/google.svg" alt="" className="h-6 w-6" />
                  Login with Google
                </Button>
                <Button 
                  onClick={() => {signIn("github", {callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL_AFTER_SIGN_IN})}} 
                  variant="outline" 
                  className="w-full"
                >
                  <img src="/github.svg" alt="" className="h-6 w-6" />
                  Login with GitHub
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              don&apos;t have an account{" "}
              <a href="/sign-up" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
    </div>
    
  )
}

export default SignUp