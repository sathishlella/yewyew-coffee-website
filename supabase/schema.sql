-- Supabase Schema for YewYew Coffee Instagram Assets

CREATE TABLE public.cafe_assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    instagram_id TEXT UNIQUE NOT NULL,
    display_url TEXT NOT NULL,
    caption TEXT,
    taken_at TIMESTAMP WITH TIME ZONE NOT NULL,
    media_type TEXT NOT NULL,
    raw JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for querying recent posts quickly
CREATE INDEX idx_cafe_assets_taken_at ON public.cafe_assets(taken_at DESC);

-- Enable RLS (Row Level Security) but allow public read access
ALTER TABLE public.cafe_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to cafe_assets"
    ON public.cafe_assets
    FOR SELECT
    TO public
    USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the trigger
CREATE TRIGGER update_cafe_assets_updated_at
    BEFORE UPDATE ON public.cafe_assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
