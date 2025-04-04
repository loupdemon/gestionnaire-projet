import AuthWrapper from "@/app/components/AuthWrapper";
import { SignIn } from "@clerk/nextjs"

const Page = () => {
  return (
    <AuthWrapper>
      <SignIn/>
    </AuthWrapper>
  )
}

export default Page;