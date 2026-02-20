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
        coordinates: [37.3688, -122.0363], // Sunnyvale
        image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
        coordinates: [37.7667, -122.3965], // UCSF Medical Center
        image_url: "https://robohash.org/medibotalpha?size=800x600&set=set1",
        description: "Advanced humanoid medical support robot. Equipped for emergency response, patient transport, and tele-medicine diagnostics."
    },
    {
        id: "7",
        name: "Aqua-Drone Surveyor",
        type: "Marine",
        hourly_rate: 85,
        fractional_availability: 0.2,
        owner_id: "user_7",
        coordinates: [37.8590, -122.4852], // Sausalito
        image_url: "https://images.unsplash.com/photo-1682687982501-1e5898cb8904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
        image_url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Wearable robotic exoskeleton that grants the user enhanced lifting strength and endurance for physical labor."
    },
    {
        id: "9",
        name: "Chef-Bot Pro",
        type: "Culinary",
        hourly_rate: 55,
        fractional_availability: 0.4,
        owner_id: "user_9",
        coordinates: [37.5841, -122.3661], // Burlingame
        image_url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
        image_url: "https://images.unsplash.com/photo-1617500588820-b0ff01cbf560?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
        image_url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Friendly humanoid robot designed for elder care and companionship. Monitors vitals and reminds about medications."
    },
    {
        id: "12",
        name: "Sentry Dog Theta",
        type: "Security",
        hourly_rate: 45,
        fractional_availability: 0.3,
        owner_id: "user_13",
        coordinates: [37.8105, -122.2618], // Oakland Hills
        image_url: "https://robohash.org/sentrydog?size=800x600&set=set1",
        description: "Autonomous quadruped security robot for perimeter patrols. Equipped with thermal and night-vision cameras."
    },
    {
        id: "13",
        name: "Agri-Harvester Max",
        type: "Agricultural",
        hourly_rate: 120,
        fractional_availability: 0.2,
        owner_id: "user_14",
        coordinates: [37.6001, -122.5002], // Half Moon Bay
        image_url: "https://images.unsplash.com/photo-1592985684742-5f653138b25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Heavy-duty agricultural drone tractor that autonomously plants and harvests large crop fields."
    },
    {
        id: "14",
        name: "Mix-Bot Master",
        type: "Culinary",
        hourly_rate: 35,
        fractional_availability: 0.5,
        owner_id: "user_15",
        coordinates: [37.8715, -122.2730], // Berkeley UC
        image_url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "An automated mixology robot that perfects cocktails and pours beer with extreme precision. The life of any party."
    },
    {
        id: "15",
        name: "Tutor-Bot Spark",
        type: "Educational",
        hourly_rate: 35,
        fractional_availability: 0.6,
        owner_id: "user_16",
        coordinates: [37.7441, -122.4764], // West Portal
        image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Interactive educational robot that helps children with math, languages, and coding through play."
    },
    {
        id: "16",
        name: "Waste-Shark Pro",
        type: "Marine",
        hourly_rate: 50,
        fractional_availability: 0.4,
        owner_id: "user_17",
        coordinates: [37.4220, -122.0841], // Mountain View Baylands
        image_url: "https://images.unsplash.com/photo-1618090584126-129cd1f3f4a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Autonomous aquatic drone that cleans up plastic waste and oil spills from marinas, bays, and lakes."
    }
];
