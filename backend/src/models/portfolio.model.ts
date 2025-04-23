import mongoose, { type Document, Schema } from "mongoose"

export interface IPortfolio extends Document {
  name: string
  description: string
  level: number
  parent?: mongoose.Types.ObjectId
  teams: mongoose.Types.ObjectId[]
  headcount: number
  budget: number
  createdBy: mongoose.Types.ObjectId
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    name: {
      type: String,
      required: [true, "Please provide a portfolio name"],
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    level: {
      type: Number,
      required: [true, "Please provide a level"],
      enum: [1, 2, 3],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
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
      required: true,
    },
  },
  { timestamps: true },
)

// Create and export the Portfolio model
export const Portfolio = mongoose.model<IPortfolio>("Portfolio", PortfolioSchema)
export default Portfolio
