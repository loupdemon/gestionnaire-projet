import { SignUp } from "@clerk/nextjs"
import AuthWrapper from "@/app/components/AuthWrapper"

const Page = () => {
  return (
   <AuthWrapper>
    <SignUp/>
  </AuthWrapper>
  )
}

export default Page;