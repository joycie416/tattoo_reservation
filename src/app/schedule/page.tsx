import Link from "next/link"

const SchedulePage = () => {
  return (
    <div>
      <Link href="/schedule/add">일정 추가</Link>
      <h3>이번달 일정표</h3>
      <div>일정표</div>
    </div>
  )
}

export default SchedulePage