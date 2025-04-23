import type { Recruiting, Candidate } from "@/types/recruiting"

// Mock data for development
// In a production environment, this data would come from the backend API
// The mock data structure mirrors the expected API response format to ensure
// smooth transition when integrating with the real API
const mockRecruitings: Recruiting[] = [
  {
    _id: "rec1",
    headcount: {
      _id: "hc1",
      title: "Senior Software Engineer",
      level: "IC4",
      location: "Remote",
      team: {
        _id: "team1",
        name: "Frontend",
      },
      roleType: {
        _id: "role1",
        title: "Software Engineer",
      },
    },
    status: "open",
    stage: "interviewing",
    recruiter: {
      _id: "user1",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    hiringManager: {
      _id: "user2",
      name: "John Doe",
      email: "john@example.com",
    },
    openDate: new Date("2023-01-15"),
    targetCloseDate: new Date("2023-03-15"),
    candidates: [
      {
        _id: "cand1",
        name: "Alice Johnson",
        email: "alice@example.com",
        status: "active",
        stage: "phone_interview",
        interviews: [
          {
            _id: "int1",
            interviewer: {
              _id: "user3",
              name: "Bob Wilson",
              email: "bob@example.com",
            },
            date: new Date("2023-02-10T14:00:00"),
            feedback: "Good communication skills, needs technical follow-up",
            decision: "neutral",
          },
        ],
      },
      {
        _id: "cand2",
        name: "Carlos Rodriguez",
        email: "carlos@example.com",
        status: "active",
        stage: "screening",
        interviews: [],
      },
    ],
    notes: "Looking for someone with strong React experience",
  },
  {
    _id: "rec2",
    headcount: {
      _id: "hc2",
      title: "Product Manager",
      level: "IC3",
      location: "San Francisco",
      team: {
        _id: "team2",
        name: "Product",
      },
      roleType: {
        _id: "role2",
        title: "Product Manager",
      },
    },
    status: "open",
    stage: "sourcing",
    recruiter: {
      _id: "user1",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    hiringManager: {
      _id: "user4",
      name: "Sarah Lee",
      email: "sarah@example.com",
    },
    openDate: new Date("2023-02-01"),
    targetCloseDate: new Date("2023-04-01"),
    candidates: [],
    notes: "Need someone with B2B SaaS experience",
  },
]

// Get all recruitings
export const getAllRecruitings = async (): Promise<Recruiting[]> => {
  // In a real implementation, this would make an authenticated GET request to /api/recruitings
  // The API would return a list of recruiting objects with populated references to headcount,
  // recruiter, hiring manager, and candidates
  // The response would be parsed and typed according to the Recruiting interface
  return Promise.resolve(mockRecruitings)
}

// Get recruiting by ID
export const getRecruitingById = async (id: string): Promise<Recruiting> => {
  // In a real implementation, this would make an authenticated GET request to /api/recruitings/{id}
  // The API would return a single recruiting object with all its related entities fully populated
  // This would include the headcount details, recruiter, hiring manager, and all candidates with their interviews
  const recruiting = mockRecruitings.find((r) => r._id === id)
  if (!recruiting) {
    // In a real implementation, this would handle API 404 responses
    // and provide meaningful error messages to the user
    throw new Error("Recruiting not found")
  }
  return Promise.resolve(recruiting)
}

// Create recruiting
export const createRecruiting = async (data: any): Promise<Recruiting> => {
  // In a real implementation, this would make an authenticated POST request to /api/recruitings
  // with the recruiting data in the request body
  // The API would validate the data, create a new recruiting record in the database,
  // and return the newly created recruiting object with its ID
  // The function would handle validation errors and other API responses

  // Mock implementation - simulates creating a new recruiting record
  const newRecruiting: Recruiting = {
    _id: `rec${mockRecruitings.length + 1}`,
    ...data,
    candidates: [],
    openDate: new Date(),
  }
  mockRecruitings.push(newRecruiting)
  return Promise.resolve(newRecruiting)
}

// Update recruiting
export const updateRecruiting = async (id: string, data: any): Promise<Recruiting> => {
  // In a real implementation, this would make an authenticated PUT request to /api/recruitings/{id}
  // with the updated recruiting data in the request body
  // The API would validate the data, update the recruiting record in the database,
  // and return the updated recruiting object
  // The function would handle validation errors, 404 errors, and other API responses

  // Mock implementation - simulates updating an existing recruiting record
  const index = mockRecruitings.findIndex((r) => r._id === id)
  if (index === -1) {
    throw new Error("Recruiting not found")
  }

  mockRecruitings[index] = {
    ...mockRecruitings[index],
    ...data,
  }

  return Promise.resolve(mockRecruitings[index])
}

// Update recruiting stage
export const updateRecruitingStage = async (id: string, stage: string): Promise<Recruiting> => {
  // In a real implementation, this would make an authenticated PATCH request to /api/recruitings/{id}/stage
  // with the new stage value in the request body
  // The API would validate the stage transition, update the recruiting record,
  // and return the updated recruiting object
  // The function would handle validation errors, invalid stage transitions, and other API responses

  // Mock implementation - simulates updating just the stage field of a recruiting record
  const index = mockRecruitings.findIndex((r) => r._id === id)
  if (index === -1) {
    throw new Error("Recruiting not found")
  }

  mockRecruitings[index].stage = stage

  return Promise.resolve(mockRecruitings[index])
}

// Delete recruiting
export const deleteRecruiting = async (id: string): Promise<void> => {
  // In a real implementation, this would make an authenticated DELETE request to /api/recruitings/{id}
  // The API would check if the recruiting can be deleted (e.g., no active candidates),
  // delete the recruiting record from the database, and return a success response
  // The function would handle 404 errors, constraint violations, and other API responses

  // Mock implementation - simulates deleting a recruiting record
  const index = mockRecruitings.findIndex((r) => r._id === id)
  if (index === -1) {
    throw new Error("Recruiting not found")
  }

  mockRecruitings.splice(index, 1)

  return Promise.resolve()
}

// Get candidate by ID
export const getCandidateById = async (recruitingId: string, candidateId: string): Promise<Candidate> => {
  // In a real implementation, this would make an authenticated GET request to
  // /api/recruitings/{recruitingId}/candidates/{candidateId}
  // The API would return a single candidate object with all its related entities fully populated
  // This would include the candidate's interviews, feedback, and other related data
  // The function would handle 404 errors and other API responses

  // Mock implementation - simulates retrieving a candidate from a recruiting record
  const recruiting = mockRecruitings.find((r) => r._id === recruitingId)
  if (!recruiting) {
    throw new Error("Recruiting not found")
  }

  const candidate = recruiting.candidates.find((c) => c._id === candidateId)
  if (!candidate) {
    throw new Error("Candidate not found")
  }

  return Promise.resolve(candidate)
}

// Add candidate
export const addCandidate = async (recruitingId: string, data: any): Promise<Candidate> => {
  // In a real implementation, this would make an authenticated POST request to
  // /api/recruitings/{recruitingId}/candidates with the candidate data in the request body
  // The API would validate the data, create a new candidate record in the database,
  // associate it with the recruiting record, and return the newly created candidate object
  // The function would handle validation errors, 404 errors, and other API responses

  // Mock implementation - simulates adding a candidate to a recruiting record
  const recruiting = mockRecruitings.find((r) => r._id === recruitingId)
  if (!recruiting) {
    throw new Error("Recruiting not found")
  }

  const newCandidate: Candidate = {
    _id: `cand${Date.now()}`, // Generate a unique ID based on timestamp
    ...data,
    interviews: [],
  }

  recruiting.candidates.push(newCandidate)

  return Promise.resolve(newCandidate)
}

// Update candidate
export const updateCandidate = async (recruitingId: string, candidateId: string, data: any): Promise<Candidate> => {
  // In a real implementation, this would make an authenticated PUT request to
  // /api/recruitings/{recruitingId}/candidates/{candidateId} with the updated candidate data
  // The API would validate the data, update the candidate record in the database,
  // and return the updated candidate object
  // The function would handle validation errors, 404 errors, and other API responses

  // Mock implementation - simulates updating a candidate in a recruiting record
  const recruiting = mockRecruitings.find((r) => r._id === recruitingId)
  if (!recruiting) {
    throw new Error("Recruiting not found")
  }

  const candidateIndex = recruiting.candidates.findIndex((c) => c._id === candidateId)
  if (candidateIndex === -1) {
    throw new Error("Candidate not found")
  }

  recruiting.candidates[candidateIndex] = {
    ...recruiting.candidates[candidateIndex],
    ...data,
  }

  return Promise.resolve(recruiting.candidates[candidateIndex])
}

// Add interview
export const addInterview = async (recruitingId: string, candidateId: string, data: any): Promise<any> => {
  // In a real implementation, this would make an authenticated POST request to
  // /api/recruitings/{recruitingId}/candidates/{candidateId}/interviews with the interview data
  // The API would validate the data, create a new interview record in the database,
  // associate it with the candidate, and return the newly created interview object
  // The function would handle validation errors, scheduling conflicts, 404 errors, and other API responses

  // Mock implementation - simulates adding an interview to a candidate
  const recruiting = mockRecruitings.find((r) => r._id === recruitingId)
  if (!recruiting) {
    throw new Error("Recruiting not found")
  }

  const candidate = recruiting.candidates.find((c) => c._id === candidateId)
  if (!candidate) {
    throw new Error("Candidate not found")
  }

  const newInterview = {
    _id: `int${Date.now()}`, // Generate a unique ID based on timestamp
    ...data,
  }

  if (!candidate.interviews) {
    candidate.interviews = []
  }

  candidate.interviews.push(newInterview)

  return Promise.resolve(newInterview)
}

// Update interview
export const updateInterview = async (
  recruitingId: string,
  candidateId: string,
  interviewId: string,
  data: any,
): Promise<any> => {
  // In a real implementation, this would make an authenticated PUT request to
  // /api/recruitings/{recruitingId}/candidates/{candidateId}/interviews/{interviewId}
  // with the updated interview data
  // The API would validate the data, update the interview record in the database,
  // and return the updated interview object
  // The function would handle validation errors, 404 errors, and other API responses

  // Mock implementation - simulates updating an interview for a candidate
  const recruiting = mockRecruitings.find((r) => r._id === recruitingId)
  if (!recruiting) {
    throw new Error("Recruiting not found")
  }

  const candidate = recruiting.candidates.find((c) => c._id === candidateId)
  if (!candidate) {
    throw new Error("Candidate not found")
  }

  if (!candidate.interviews) {
    throw new Error("Interview not found")
  }

  const interviewIndex = candidate.interviews.findIndex((i) => i._id === interviewId)
  if (interviewIndex === -1) {
    throw new Error("Interview not found")
  }

  candidate.interviews[interviewIndex] = {
    ...candidate.interviews[interviewIndex],
    ...data,
  }

  return Promise.resolve(candidate.interviews[interviewIndex])
}

// Update recruiting notes
export const updateRecruitingNotes = async (recruitingId: string, notes: string): Promise<Recruiting> => {
  // In a real implementation, this would make an authenticated PATCH request to
  // /api/recruitings/{recruitingId}/notes with the notes in the request body
  // The API would update the notes field of the recruiting record in the database
  // and return the updated recruiting object
  // The function would handle 404 errors and other API responses

  // Mock implementation - simulates updating the notes field of a recruiting record
  const index = mockRecruitings.findIndex((r) => r._id === recruitingId)
  if (index === -1) {
    throw new Error("Recruiting not found")
  }

  mockRecruitings[index].notes = notes

  return Promise.resolve(mockRecruitings[index])
}

// Export all required functions
