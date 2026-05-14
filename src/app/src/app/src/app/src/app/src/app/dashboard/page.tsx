import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import FlowIaClient from "@/components/FlowIaClient"

export default async function DashboardPage() {
  const { userId } = auth()
  if (!userId) redirect("/auth/login")

  const clerkUser = await currentUser()
  if (!clerkUser) redirect("/auth/login")

  const userData = {
    name:    `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || "Usuario",
    email:   clerkUser.emailAddresses[0]?.emailAddress ?? "",
    company: "Mi Empresa",
    plan:    "GROWTH",
  }

  return <FlowIaClient user={userData} />
}
