
export interface BotSighting {
  id: string; // UUID
  location: {
    latitude: number;
    longitude: number;
  };
  class: 'sidewalk_courier' | 'aerial_drone' | 'quadrupedal_inspector' | 'autonomous_road_vehicle' | 'surveillance_unit' | 'other_machine' | 'not_a_bot' | 'delivery' | 'security' | 'drone' | 'humanoid' | 'other';
  vibe_score: number; // 1-100
  timestamp: string; // ISO string
  imageUrl?: string;
  metadata?: Record<string, unknown>;
}
