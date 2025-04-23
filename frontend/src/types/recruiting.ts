export interface Interview {
  _id: string
  interviewer: {
    _id: string
    name: string
    email: string
  }
  date: Date
  feedback?: string
  decision?: "strong_yes" | "yes" | "neutral" | "no" | "strong_no"
}

export interface Candidate {
  _id: string
  name: string
  email: string
  status: "active" | "rejected" | "withdrawn" | "hired"
  stage: "applied" | "screening" | "phone_interview" | "onsite" | "offer" | "accepted" | "rejected"
  interviews?: Interview[]
}

export interface Recruiting {
  _id: string
  headcount: {
    _id: string
    title: string
    level: string
    location: string
    team: {
      _id: string
      name: string
    }
    roleType: {
      _id: string
      title: string
    }
  }
  status: "open" | "on_hold" | "closed_filled" | "closed_cancelled"
  stage: "triage" | "sourcing" | "screening" | "interviewing" | "offer" | "closed"
  recruiter: {
    _id: string
    name: string
    email: string
  }
  hiringManager: {
    _id: string
    name: string
    email: string
  }
  openDate: Date
  targetCloseDate: Date
  actualCloseDate?: Date
  candidates: Candidate[]
  notes: string
}
