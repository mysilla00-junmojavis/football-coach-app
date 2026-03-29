export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Drill {
  id: string
  coach_id: string
  name: string
  purpose: string[]
  duration: number
  min_players: number
  max_players: number
  difficulty: Difficulty
  description: string
  equipment: string[]
  created_at: string
}

export interface TrainingPlan {
  id: string
  coach_id: string
  date: string
  drills: string[]
  memo: string | null
  created_at: string
}

export interface TrainingRecord {
  id: string
  plan_id: string | null
  coach_id: string
  date: string
  drill_ids: string[]
  attendees: number
  memo: string | null
  created_at: string
}

export interface Coach {
  id: string
  name: string
  avatar_url: string | null
  created_at: string
}
