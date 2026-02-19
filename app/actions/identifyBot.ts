'use server';

import { model } from '@/lib/gemini';

export async function identifyBot(imageData: string) {
    console.log("Analyzing image with Gemini...");

    try {
        // PROTOTYPE FALLBACK: If API key is dummy or missing, return mock result
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key') {
            console.log("PROTOTYPE MODE: Returning mock AI analysis");
            return {
                success: true,
                data: {
                    class: "delivery_bot",
                    confidence: 0.98,
                    vibe_score: 82,
                    description: "Serve Robotics Gen 3 unit detected. Engaging in last-mile burrito distribution with moderate dystopian efficiency.",
                    specs: {
                        weight: 45,
                        speed: 6,
                        goals: "Burrito relocation"
                    }
                }
            };
        }

        const base64Data = imageData.split(',')[1] || imageData;

        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: "image/jpeg",
            },
        };

        // 2. Define Prompt & Schema
        // We ask for a strictly valid JSON response.
        const prompt = `
        You are a cynical, elite technical observer for the "BOTdar" autonomous machine census.
        Your task is to deconstruct this image and classify the machine within with surgical precision.
        
        Return a JSON object with the following fields:
        - class: One of ["sidewalk_courier", "delivery_bot", "aerial_drone", "quadrupedal_inspector", "autonomous_road_vehicle", "surveillance_unit", "not_a_bot"]
        - confidence: Number (0.0 - 1.0)
        - estimated_weight_kg: Number
        - max_speed_kmh: Number
        - usual_goals: String (be specific: "Stealing jobs", "Last-mile carb consumption", "Aggressive surveillance")
        - vibe_score: Number (0-100, where 100 is maximum dystopian cyberpunk energy)
        - description: Technical identification. Reference specific hardware models if visible (e.g., "Serve Robotics G3", "Starship MK4"). Be witty, slightly nihilistic, and technical.
        
        If it's just a human or a cat, set class to "not_a_bot" and confidence to 0.
        OUTPUT ONLY JSON. NO MARKDOWN. NO CHATTER.
        `;

        // 3. Call Gemini
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // 4. Parse JSON
        // Cleanup potential markdown formatting if Gemini adds it despite instructions
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanedText);

        console.log("Gemini Analysis Complete:", data);

        return {
            success: true,
            data: {
                class: data.class,
                confidence: data.confidence,
                vibe_score: data.vibe_score,
                description: data.description,
                specs: {
                    weight: data.estimated_weight_kg,
                    speed: data.max_speed_kmh,
                    goals: data.usual_goals
                }
            }
        };

    } catch (error) {
        console.error("Gemini Identification Failed:", error);
        return {
            success: false,
            error: "Failed to identify target."
        };
    }
}
