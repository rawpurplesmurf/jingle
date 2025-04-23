import mongoose from "mongoose"

export interface IRole extends mongoose.Document {
  title: string
  description: string
  jobFamily: string
  jobGroup: string
  roleType: string
  skills: string[]
  levelRange: string[]
}

const roleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    jobFamily: {
      type: String,
      required: true,
    },
    jobGroup: {
      type: String,
      required: true,
    },
    roleType: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    levelRange: [
      {
        type: String,
        enum: ["L1", "L2", "L3", "L4", "L5", "L6"],
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Role = mongoose.model<IRole>("Role", roleSchema)
