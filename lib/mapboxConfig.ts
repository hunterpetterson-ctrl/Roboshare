
export const mapboxConfig = {
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!,
    styleUrl: 'mapbox://styles/mapbox/dark-v11', // Placeholder for "Community Dark"
    defaultCenter: {
        latitude: 37.7749, // Default to SF or user location
        longitude: -122.4194,
        zoom: 12
    }
};
