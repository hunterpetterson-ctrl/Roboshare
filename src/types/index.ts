export type Robot = {
    id: string;
    name: string;
    type: string;
    hourly_rate: number;
    fractional_availability: number; // e.g., 0.1 to 1.0
    owner_id: string;
    coordinates: [number, number]; // [lat, lng]
    image_url: string;
    description: string;
};

export type UserProfile = {
    id: string;
    username: string;
    full_name: string;
    rating: number; // 0 to 5
};

export type Booking = {
    id: string;
    robot_id: string;
    user_id: string;
    start_time: string; // ISO string
    end_time: string; // ISO string
    share_amount: number; // e.g., 0.1
    total_cost: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
};
