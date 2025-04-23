import { HeadcountForm } from "@/components/headcount/headcount-form"

export default function NewHeadcountPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Add New Headcount Position</h1>
      <HeadcountForm />
    </div>
  )
}
