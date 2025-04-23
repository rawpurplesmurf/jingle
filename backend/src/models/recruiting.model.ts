import mongoose from "mongoose"

export interface IRecruiting extends mongoose.Document {
  headcount: mongoose.Types.ObjectId
  status: string
  stage: string
  recruiter: mongoose.Types.ObjectId
  hiringManager: mongoose.Types.ObjectId
  openDate: Date
  targetCloseDate: Date
  actualCloseDate?: Date
  candidates: Array<{
    name: string
    email: string
    status: string
    stage: string
    interviews: Array<{
      interviewer: mongoose.Types.ObjectId
      date: Date
      feedback: string
      decision: string
    }>
  }>
  notes: string
}

const recruitingSchema = new mongoose.Schema(
  {
    headcount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Headcount",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "on_hold", "closed_filled", "closed_cancelled"],
      default: "open",
    },
    stage: {
      type: String,
      enum: ["triage", "sourcing", "screening", "interviewing", "offer", "closed"],
      default: "triage",
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hiringManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    openDate: {
      type: Date,
      default: Date.now,
    },
    targetCloseDate: {
      type: Date,
      required: true,
    },
    actualCloseDate: {
      type: Date,
    },
    candidates: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["active", "rejected", "withdrawn", "hired"],
          default: "active",
        },
        stage: {
          type: String,
          enum: ["applied", "screening", "phone_interview", "onsite", "offer", "accepted", "rejected"],
          default: "applied",
        },
        interviews: [
          {
            interviewer: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
            date: {
              type: Date,
              required: true,
            },
            feedback: {
              type: String,
            },
            decision: {
              type: String,
              enum: ["strong_yes", "yes", "neutral", "no", "strong_no"],
            },
          },
        ],
      },
    ],
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export const Recruiting = mongoose.model<IRecruiting>("Recruiting", recruitingSchema)
