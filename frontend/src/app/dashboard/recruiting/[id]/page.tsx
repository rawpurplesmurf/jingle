import { RecruitingDetail } from "@/components/recruiting/recruiting-detail"

export default function RecruitingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6">
      <RecruitingDetail recruitingId={params.id} />
    </div>
  )
}
