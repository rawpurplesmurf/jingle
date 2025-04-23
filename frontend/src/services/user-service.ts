// This is a mock service for user data
// In a real application, this would make API calls to the backend

export const fetchUsers = async (): Promise<any[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be replaced with actual API call in a real app
      resolve([
        { _id: "1", name: "John Doe", email: "john@example.com" },
        { _id: "2", name: "Jane Smith", email: "jane@example.com" },
        { _id: "3", name: "Mike Johnson", email: "mike@example.com" },
        { _id: "4", name: "Sarah Williams", email: "sarah@example.com" },
        { _id: "5", name: "Robert Brown", email: "robert@example.com" },
      ])
    }, 500)
  })
}

export const getAllUsers = async (): Promise<any[]> => {
  return fetchUsers()
}

// Export all required functions
