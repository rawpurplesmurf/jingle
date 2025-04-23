import { HeadcountForm } from "@/components/headcount/headcount-form"

export default function EditHeadcountPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Headcount Position</h1>
      <HeadcountForm headcountId={params.id} isEdit={true} />
    </div>
  )
}
