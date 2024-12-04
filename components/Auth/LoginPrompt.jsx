import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export function LoginPrompt() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      {/* Replacing Card with a simple div structure */}
      <div className="w-full max-w-md bg-white dark:bg-[#2a2a2a] p-8 rounded-lg shadow-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Sign in to access your projects and continue building amazing things
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full py-6 text-base"
            onClick={() => signIn()}
          >
            <FcGoogle />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              {/* <Separator /> */}
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#2a2a2a] px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button className="w-full py-6 text-base" onClick={() => signIn()}>
            <LogIn className="mr-2 h-5 w-5" />
            Sign in with Gmail
          </Button>
        </div>

        {/* Footer */}
        <div className="flex flex-col space-y-4 text-center text-sm text-muted-foreground">
          <p>
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPrompt;
