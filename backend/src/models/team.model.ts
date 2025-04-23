import mongoose, { type Document, Schema } from "mongoose"

export interface ITeam extends Document {
  name: string
  description: string
  parent?: mongoose.Types.ObjectId
  members: mongoose.Types.ObjectId[]
  portfolios: mongoose.Types.ObjectId[]
  manager: mongoose.Types.ObjectId
  headcount: number
  budget: number
  createdBy: mongoose.Types.ObjectId
}

const TeamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: [true, "Please provide a team name"],
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    portfolios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio",
      },
    ],
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a manager"],
    },
    headcount: {
      type: Number,
      default: 0,
    },
    budget: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
)

// Create and export the Team model
export const Team = mongoose.model<ITeam>("Team", TeamSchema)
export default Team
