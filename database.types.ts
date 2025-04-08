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
      confirmed_reservations: {
        Row: {
          condition: string
          contact: string
          cost: number
          created_at: string
          date: string
          description: string
          id: string
          instagram: string
          modified_at: string
          name: string
          part: string
          password: string
          reservation_id: string
          size: string
          time: string
          type: string
        }
        Insert: {
          condition?: string
          contact?: string
          cost?: number
          created_at?: string
          date?: string
          description?: string
          id?: string
          instagram?: string
          modified_at?: string
          name?: string
          part?: string
          password?: string
          reservation_id: string
          size?: string
          time?: string
          type?: string
        }
        Update: {
          condition?: string
          contact?: string
          cost?: number
          created_at?: string
          date?: string
          description?: string
          id?: string
          instagram?: string
          modified_at?: string
          name?: string
          part?: string
          password?: string
          reservation_id?: string
          size?: string
          time?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "confirmed_reservationss_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "user_reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      dummy: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      notice: {
        Row: {
          content: string
          created_at: string
          fixed: boolean
          hidden: boolean
          id: string
          image_num: number
          modified_at: string
          title: string
        }
        Insert: {
          content?: string
          created_at?: string
          fixed?: boolean
          hidden?: boolean
          id?: string
          image_num?: number
          modified_at?: string
          title?: string
        }
        Update: {
          content?: string
          created_at?: string
          fixed?: boolean
          hidden?: boolean
          id?: string
          image_num?: number
          modified_at?: string
          title?: string
        }
        Relationships: []
      }
      portfolio: {
        Row: {
          content: string
          created_at: string
          fixed: boolean
          hidden: boolean
          id: string
          modified_at: string
          part: string
          size: string
        }
        Insert: {
          content?: string
          created_at?: string
          fixed?: boolean
          hidden?: boolean
          id?: string
          modified_at?: string
          part?: string
          size?: string
        }
        Update: {
          content?: string
          created_at?: string
          fixed?: boolean
          hidden?: boolean
          id?: string
          modified_at?: string
          part?: string
          size?: string
        }
        Relationships: []
      }
      schedules: {
        Row: {
          contact: string
          created_at: string
          date: string
          full_date: string
          id: string
          month: string
          time: string
          user_id: string | null
          user_name: string
          year: string
        }
        Insert: {
          contact?: string
          created_at?: string
          date?: string
          full_date?: string
          id?: string
          month?: string
          time?: string
          user_id?: string | null
          user_name?: string
          year?: string
        }
        Update: {
          contact?: string
          created_at?: string
          date?: string
          full_date?: string
          id?: string
          month?: string
          time?: string
          user_id?: string | null
          user_name?: string
          year?: string
        }
        Relationships: []
      }
      user_reservations: {
        Row: {
          condition: string
          contact: string
          created_at: string
          date: string
          description: string
          id: string
          image_num: number
          instagram: string
          modified_at: string
          name: string
          part: string
          password: string
          size: string
          time: string
          type: string
        }
        Insert: {
          condition?: string
          contact?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          image_num?: number
          instagram?: string
          modified_at?: string
          name?: string
          part?: string
          password?: string
          size?: string
          time?: string
          type?: string
        }
        Update: {
          condition?: string
          contact?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          image_num?: number
          instagram?: string
          modified_at?: string
          name?: string
          part?: string
          password?: string
          size?: string
          time?: string
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
