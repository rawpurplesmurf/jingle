// This is a mock service for role data
// In a real application, this would make API calls to the backend

export const getAllRoles = async (): Promise<any[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be replaced with actual API call in a real app
      resolve([
        { _id: "1", title: "Software Engineer", jobFamily: "Engineering" },
        { _id: "2", title: "Product Manager", jobFamily: "Product" },
        { _id: "3", title: "Designer", jobFamily: "Design" },
        { _id: "4", title: "Data Scientist", jobFamily: "Data" },
        { _id: "5", title: "Marketing Manager", jobFamily: "Marketing" },
      ])
    }, 500)
  })
}

export const getRoleById = async (id: string): Promise<any> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be replaced with actual API call in a real app
      resolve({
        _id: id,
        title: "Software Engineer",
        jobFamily: "Engineering",
        description: "Develops software applications",
        levels: ["IC1", "IC2", "IC3", "IC4", "IC5"],
      })
    }, 500)
  })
}
