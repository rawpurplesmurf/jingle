import mongoose, { type Document, Schema } from "mongoose"

export interface IHeadcount extends Document {
  title: string
  type: string
  level: string
  status: string
  team: mongoose.Types.ObjectId
  portfolio: mongoose.Types.ObjectId
  manager: mongoose.Types.ObjectId
  location: string
  costCenter: string
  annualCost: number
  startDate: Date
  endDate?: Date
  businessCase: string
  approvals: {
    approver: mongoose.Types.ObjectId
    status: string
    date: Date
    comments?: string
  }[]
  createdBy: mongoose.Types.ObjectId
}

const HeadcountSchema = new Schema<IHeadcount>(
  {
    title: {
      type: String,
      required: [true, "Please provide a job title"],
      maxlength: 100,
    },
    type: {
      type: String,
      required: [true, "Please provide a headcount type"],
      enum: ["FTE", "Contractor", "Vendor", "Agency"],
    },
    level: {
      type: String,
      required: [true, "Please provide a level"],
    },
    status: {
      type: String,
      required: [true, "Please provide a status"],
      enum: ["Draft", "Pending Approval", "Approved", "Rejected", "On Hold", "Filled", "Closed"],
      default: "Draft",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Please provide a team"],
    },
    portfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: [true, "Please provide a portfolio"],
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a manager"],
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
    },
    costCenter: {
      type: String,
      required: [true, "Please provide a cost center"],
    },
    annualCost: {
      type: Number,
      required: [true, "Please provide an annual cost"],
    },
    startDate: {
      type: Date,
      required: [true, "Please provide a start date"],
    },
    endDate: {
      type: Date,
    },
    businessCase: {
      type: String,
      required: [true, "Please provide a business case"],
    },
    approvals: [
      {
        approver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
        date: {
          type: Date,
          default: Date.now,
        },
        comments: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
)

// Create and export the Headcount model
export const Headcount = mongoose.model<IHeadcount>("Headcount", HeadcountSchema)
export default Headcount
