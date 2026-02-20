import { Robot } from "@/types";

export const MOCK_ROBOTS: Robot[] = [
    {
        id: "1",
        name: "Atlas Helper",
        type: "Humanoid",
        hourly_rate: 45,
        fractional_availability: 0.3,
        owner_id: "user_1",
        coordinates: [37.7749, -122.4194], // Downtown SF
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
        coordinates: [37.8044, -122.2712], // Oakland
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
        coordinates: [37.7599, -122.4368], // Inner Sunset
        image_url: "https://images.unsplash.com/photo-1673027066824-712b251ae928?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Agile quadruped robot designed for inspection in hard-to-reach areas. Equipped with thermal cameras and lidar."
    },
    {
        id: "4",
        name: "Industrial Assembly Unit",
        type: "Industrial",
        hourly_rate: 225,
        fractional_availability: 0.05,
        owner_id: "user_5",
        coordinates: [37.7305, -122.3826], // Bayview industrial
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
        coordinates: [37.7694, -122.4862], // Golden Gate Park
        image_url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Sleek garden assistant nestled in the park. Does weeding, watering, and soil analysis while blending into your garden aesthetics."
    },
    {
        id: "6",
        name: "Medi-Bot Alpha",
        type: "Medical",
        hourly_rate: 150,
        fractional_availability: 0.1,
        owner_id: "user_6",
        coordinates: [37.7667, -122.3965], // UCSF Medical Center at Mission Bay
        image_url: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Advanced humanoid medical support robot. Equipped for emergency response, patient transport, and tele-medicine diagnostics."
    },
    {
        id: "7",
        name: "Aqua-Drone Surveyor",
        type: "Marine",
        hourly_rate: 85,
        fractional_availability: 0.2,
        owner_id: "user_7",
        coordinates: [37.8205, -122.4795], // Near Golden Gate Bridge water
        image_url: "https://images.unsplash.com/photo-1518349619113-03114f061376?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Submersible underwater drone for hull inspections, marine research, and underwater photography."
    },
    {
        id: "8",
        name: "Construx Exosuit",
        type: "Industrial",
        hourly_rate: 110,
        fractional_availability: 0.5,
        owner_id: "user_8",
        coordinates: [37.7952, -122.3934], // Near Embarcadero
        image_url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Wearable robotic exoskeleton that grants the user enhanced lifting strength and endurance for physical labor."
    },
    {
        id: "9",
        name: "Chef-Bot Pro",
        type: "Culinary",
        hourly_rate: 55,
        fractional_availability: 0.4,
        owner_id: "user_9",
        coordinates: [37.7946, -122.3999], // Financial District
        image_url: "https://images.unsplash.com/photo-1546251915-188cc26e3381?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Automated culinary robot capable of prepping ingredients, cooking complex recipes, and cleaning up afterwards."
    },
    {
        id: "10",
        name: "Urban Courier",
        type: "Delivery",
        hourly_rate: 18,
        fractional_availability: 0.9,
        owner_id: "user_10",
        coordinates: [37.7833, -122.4167], // Tenderloin
        image_url: "https://images.unsplash.com/photo-1608681539203-aa6a4cba8f22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Nimble sidewalk delivery robot. Perfect for sending packages or groceries across town securely."
    },
    {
        id: "11",
        name: "CareBot Companion",
        type: "Medical",
        hourly_rate: 40,
        fractional_availability: 0.8,
        owner_id: "user_12",
        coordinates: [37.7858, -122.4364], // Pacific Heights
        image_url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Friendly humanoid robot designed for elder care and companionship. Monitors vitals and reminds about medications."
    }
];
