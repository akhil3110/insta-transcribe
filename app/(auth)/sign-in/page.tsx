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
import Link from "next/link"

const  SignUp = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[#13171d]">
    <div className="w-full max-w-sm">
    <div className={cn("flex flex-col gap-6 ")}>
      <Card className="bg-[#1c2128]  text-white">
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
                  variant="default" 
                  className="w-full"
                >
                  <img src="/google.svg" alt="" className="h-6 w-6" />
                  Login with Google
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Go back to {" "}
              <Link href="/" className="underline underline-offset-4">
                Homepage
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
    </div>
    </div>
    
  )
}

export default SignUp