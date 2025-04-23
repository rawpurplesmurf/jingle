import { CandidateDetail } from "@/components/recruiting/candidate-detail"

export default function CandidateDetailPage({ params }: { params: { id: string; candidateId: string } }) {
  return (
    <div className="container mx-auto py-6">
      <CandidateDetail recruitingId={params.id} candidateId={params.candidateId} />
    </div>
  )
}
