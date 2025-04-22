export interface Profile {
  userId: { type: String, required: true, unique: true },
  name: { type: String, default: null },
  bio: { type: String, default: null },
  personalityType: { type: String, default: null }
}
