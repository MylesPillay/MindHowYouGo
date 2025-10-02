export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      contacts: {
        Row: {
          added_to_inbox: boolean | null
          appointment_date: string | null
          contact_email: string | null
          contact_message: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          id: number
        }
        Insert: {
          added_to_inbox?: boolean | null
          appointment_date?: string | null
          contact_email?: string | null
          contact_message?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          added_to_inbox?: boolean | null
          appointment_date?: string | null
          contact_email?: string | null
          contact_message?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      content_blog_posts: {
        Row: {
          blog_date: string | null
          blog_description: string | null
          blog_icon: string | null
          blog_title: string | null
          blog_url_slug: string | null
          created_at: string
          id: number
        }
        Insert: {
          blog_date?: string | null
          blog_description?: string | null
          blog_icon?: string | null
          blog_title?: string | null
          blog_url_slug?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          blog_date?: string | null
          blog_description?: string | null
          blog_icon?: string | null
          blog_title?: string | null
          blog_url_slug?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      content_cbt_explained: {
        Row: {
          created_at: string
          id: number
          services_text_content: Json | null
          text_content: Json | null
          text_highlghts: Json | null
          urls: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          services_text_content?: Json | null
          text_content?: Json | null
          text_highlghts?: Json | null
          urls?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          services_text_content?: Json | null
          text_content?: Json | null
          text_highlghts?: Json | null
          urls?: Json | null
        }
        Relationships: []
      }
      content_clinic: {
        Row: {
          category: string | null
          created_at: string
          icon: string | null
          id: number
          list_items: Json | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          icon?: string | null
          id?: number
          list_items?: Json | null
        }
        Update: {
          category?: string | null
          created_at?: string
          icon?: string | null
          id?: number
          list_items?: Json | null
        }
        Relationships: []
      }
      content_hero_section: {
        Row: {
          company_name: string | null
          created_at: string
          cta_button_text: string | null
          cta_message: string | null
          hero_image: Json | null
          id: number
          intro_message: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          cta_button_text?: string | null
          cta_message?: string | null
          hero_image?: Json | null
          id?: number
          intro_message?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          cta_button_text?: string | null
          cta_message?: string | null
          hero_image?: Json | null
          id?: number
          intro_message?: string | null
        }
        Relationships: []
      }
      content_testimonials: {
        Row: {
          created_at: string
          id: number
          linked_therapy: string | null
          testimony_date: string | null
          testimony_description: string | null
          testimony_heading: string | null
          testimony_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          linked_therapy?: string | null
          testimony_date?: string | null
          testimony_description?: string | null
          testimony_heading?: string | null
          testimony_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          linked_therapy?: string | null
          testimony_date?: string | null
          testimony_description?: string | null
          testimony_heading?: string | null
          testimony_name?: string | null
        }
        Relationships: []
      }
      home_text_blocks_clinic: {
        Row: {
          created_at: string
          id: number
          section_title: string | null
          text_highlight_1: string | null
          text_highlight_2: string | null
          text_highlight_3: string | null
          text_slice_1: string | null
          text_slice_2: string | null
          text_slice_3: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          section_title?: string | null
          text_highlight_1?: string | null
          text_highlight_2?: string | null
          text_highlight_3?: string | null
          text_slice_1?: string | null
          text_slice_2?: string | null
          text_slice_3?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          section_title?: string | null
          text_highlight_1?: string | null
          text_highlight_2?: string | null
          text_highlight_3?: string | null
          text_slice_1?: string | null
          text_slice_2?: string | null
          text_slice_3?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
