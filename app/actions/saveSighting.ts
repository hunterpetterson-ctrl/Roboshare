'use server';

import { supabase } from '@/lib/supabaseClient';

export async function saveSighting(data: {
    class: string;
    vibe_score: number;
    location: { latitude: number; longitude: number };
    description: string;
    vibe_note?: string;
    metadata?: Record<string, unknown>;
}) {
    console.log("Saving sighting to database...", data);

    // PROTOTYPE FALLBACK: If Supabase not configured, simulate success
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')) {
        console.log("PROTOTYPE MODE: Simulating database save success");
        return { success: true };
    }

    try {
        // Convert lat/lng to WKT (Well-Known Text) for PostGIS
        // Standard format is POINT(longitude latitude)
        const pointWKT = `POINT(${data.location.longitude} ${data.location.latitude})`;

        const { error } = await supabase
            .from('bot_sightings')
            .insert([
                {
                    class: data.class,
                    vibe_score: data.vibe_score,
                    location: pointWKT, // Supabase/PostGIS handles WKT strings
                    metadata: {
                        description: data.description,
                        vibe_note: data.vibe_note,
                        ...data.metadata
                    }
                }
            ]);

        if (error) {
            console.error("Database Insert Error:", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error: unknown) {
        console.error("Save Sighting Failed:", error);
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
}
