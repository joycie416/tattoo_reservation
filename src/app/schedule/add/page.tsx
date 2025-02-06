import { getCurrentTime } from "@/utils/schedule"

const AddSchedulePage = () => {
  const today = getCurrentTime();
  console.log(today)

  return (
    <div>AddSchedulePage</div>
  )
}

export default AddSchedulePage