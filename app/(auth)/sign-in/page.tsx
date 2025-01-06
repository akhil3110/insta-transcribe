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
import { signIn } from "next-auth/react"

const  SignUp = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
         
            
            <div className="flex flex-col gap-y-4 mt-4">
              <Button 
                  onClick={() => {signIn("google", {callbackUrl: "/"})}} 
                  variant="outline" 
                  className="w-full"
                >
                  <img src="/google.svg" alt="" className="h-6 w-6" />
                  Login with Google
                </Button>
                <Button 
                  onClick={() => {signIn("github", {callbackUrl: "/"})}} 
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
        </CardContent>
      </Card>
    </div>
    </div>
    </div>
    
  )
}

export default SignUp