import { Robot } from "@/types";

export const MOCK_ROBOTS: Robot[] = [
    {
        id: "1",
        name: "Atlas Helper",
        type: "Humanoid",
        hourly_rate: 45,
        fractional_availability: 0.3,
        owner_id: "user_1",
        coordinates: [37.7749, -122.4194],
        image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Versatile humanoid robot capable of lifting heavy objects and precise manipulation. Great for moving or warehouse tasks."
    },
    {
        id: "2",
        name: "Eco-Drone X1",
        type: "Aerial",
        hourly_rate: 25,
        fractional_availability: 0.8,
        owner_id: "user_2",
        coordinates: [37.7849, -122.4094],
        image_url: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "High-end surveillance and mapping drone. Perfect for site surveys or event photography."
    },
    {
        id: "3",
        name: "Spot Mini",
        type: "Quadruped",
        hourly_rate: 60,
        fractional_availability: 0.1,
        owner_id: "user_3",
        coordinates: [37.7649, -122.4294],
        image_url: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Agile quadruped robot designed for inspection in hard-to-reach areas. Equipped with thermal cameras."
    },
    {
        id: "4",
        name: "Industrial Assembly Unit",
        type: "Industrial",
        hourly_rate: 225,
        fractional_availability: 0.05, // High value, so smaller shares
        owner_id: "user_5",
        coordinates: [37.7549, -122.4394],
        image_url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Heavy-duty industrial assembly robot. Precision manufacturing, welding, and high-load manipulation. 6-axis freedom."
    },
    {
        id: "5",
        name: "Garden Bot 3000",
        type: "Agricultural",
        hourly_rate: 15,
        fractional_availability: 0.5,
        owner_id: "user_4",
        coordinates: [37.7949, -122.4194], // Moved slightly
        image_url: "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Sleek, organic-form garden assistant. Does weeding, watering, and soil analysis while blending into your garden aesthetics."
    }
];
