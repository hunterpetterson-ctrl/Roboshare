import { MOCK_ROBOTS } from "@/data/robots";
import { RobotCard } from "@/components/listings/RobotCard";
import MapComponent from "@/components/map"; // Import the dynamic version
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-card sticky top-0 z-10 w-full shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-primary">RoboShare</span>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <a href="#" className="hover:underline">Browse</a>
          <a href="#" className="hover:underline">My Robots</a>
          <a href="#" className="hover:underline">Wallet</a>
          <Button size="sm">List a Robot</Button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Listings */}
        <div className="w-full max-w-md border-r bg-background overflow-y-auto p-4 flex flex-col gap-4 shadow-xl z-20">
          <div className="flex justify-between items-center mb-2">
            <h2 className="tex-xl font-semibold">Available Robots</h2>
            <span className="text-sm text-muted-foreground">{MOCK_ROBOTS.length} found</span>
          </div>

          {/* Filter Placeholder */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            <Button variant="outline" size="sm" className="rounded-full">All</Button>
            <Button variant="ghost" size="sm" className="rounded-full">Humanoid</Button>
            <Button variant="ghost" size="sm" className="rounded-full">Aerial</Button>
            <Button variant="ghost" size="sm" className="rounded-full">Quadruped</Button>
          </div>

          <div className="flex flex-col gap-4">
            {MOCK_ROBOTS.map(robot => (
              <RobotCard key={robot.id} robot={robot} />
            ))}
          </div>
        </div>

        {/* Right Content: Map */}
        <div className="flex-1 relative bg-secondary">
          <MapComponent robots={MOCK_ROBOTS} className="h-full w-full" />

          {/* Floating Search Bar (Example) */}
          <div className="absolute top-4 left-4 right-4 max-w-lg mx-auto bg-card rounded-lg shadow-lg p-2.5 z-[400] flex gap-2"> {/* z-index above leaflet */}
            <input
              type="text"
              placeholder="Search for robots nearby..."
              className="flex-1 bg-transparent border-none outline-none text-sm px-2"
            />
            <Button size="sm">Search</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
