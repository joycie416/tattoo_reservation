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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
