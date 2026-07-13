import { getStaff } from "@/lib/actions/admin"
import StaffTable from "./StaffTable"

export default async function PersonnelPage() {
  const staffMembers = await getStaff()

  return <StaffTable initialStaff={staffMembers} />
}
