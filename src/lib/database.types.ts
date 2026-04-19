export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      needs: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          location: string
          ngo_id: string | null
          tags: string[] | null
          title: string
          urgency_level: string | null
          source: string | null
          source_url: string | null
          priority_score: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          location: string
          ngo_id?: string | null
          tags?: string[] | null
          title: string
          urgency_level?: string | null
          source?: string | null
          source_url?: string | null
          priority_score?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string
          ngo_id?: string | null
          tags?: string[] | null
          title?: string
          urgency_level?: string | null
          source?: string | null
          source_url?: string | null
          priority_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "needs_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          location: string | null
          name: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          location?: string | null
          name?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          location?: string | null
          name?: string | null
          role?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string | null
          id: string
          need_id: string | null
          status: string | null
          volunteer_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          need_id?: string | null
          status?: string | null
          volunteer_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          need_id?: string | null
          status?: string | null
          volunteer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteers: {
        Row: {
          availability: string | null
          created_at: string | null
          id: string
          location: string | null
          skills: string[] | null
          user_id: string | null
        }
        Insert: {
          availability?: string | null
          created_at?: string | null
          id?: string
          location?: string | null
          skills?: string[] | null
          user_id?: string | null
        }
        Update: {
          availability?: string | null
          created_at?: string | null
          id?: string
          location?: string | null
          skills?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
  }
}
