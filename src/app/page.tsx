"use client";

import { useState, useMemo } from "react";
import { MOCK_ROBOTS } from "@/data/robots";
import { RobotCard } from "@/components/listings/RobotCard";
import MapComponent from "@/components/map";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Gift } from "lucide-react";

// Constants
const ROBOT_TYPES = ["All", "Humanoid", "Aerial", "Quadruped", "Industrial", "Agricultural", "Medical", "Marine", "Culinary", "Delivery", "Security", "Educational"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRobots = useMemo(() => {
    return MOCK_ROBOTS.filter((robot) => {
      const matchesFilter = activeFilter === "All" || robot.type === activeFilter;
      const matchesSearch =
        searchQuery === "" ||
        robot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        robot.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        robot.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <>
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden h-full">
        {/* Left Sidebar: Listings */}
        <div className="w-full max-w-md border-r bg-background overflow-y-auto flex flex-col shadow-xl z-20">
          {/* Search & Filters */}
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 pb-2 border-b">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Available Robots</h2>
              <span className="text-sm text-muted-foreground">{filteredRobots.length} found</span>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 mb-3">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search robots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-xs text-muted-foreground hover:text-foreground">
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
              {ROBOT_TYPES.map((type) => (
                <Button
                  key={type}
                  variant={activeFilter === type ? "default" : "outline"}
                  size="sm"
                  className="rounded-full text-xs whitespace-nowrap shrink-0"
                  onClick={() => setActiveFilter(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Robot Cards */}
          <div className="flex flex-col gap-4 p-4">
            {filteredRobots.length > 0 ? (
              filteredRobots.map((robot) => (
                <RobotCard key={robot.id} robot={robot} />
              ))
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <p className="text-lg mb-2">No robots found</p>
                <p className="text-sm">Try adjusting your filters or search terms</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Content: Map */}
        <div className="flex-1 relative bg-secondary">
          <MapComponent robots={filteredRobots} className="h-full w-full" />

          {/* Floating Search Bar on Map */}
          <div className="absolute top-4 left-4 right-4 max-w-lg mx-auto bg-card/95 backdrop-blur rounded-xl shadow-lg p-3 z-[400] flex gap-2 items-center">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search for robots nearby..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm"
            />
            <Button size="sm" className="shrink-0">Search</Button>
          </div>

          {/* Fractional Share Callout */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur rounded-xl shadow-lg px-6 py-3 z-[400] flex items-center gap-4 max-w-md">
            <div className="text-3xl">🤖</div>
            <div>
              <p className="text-sm font-semibold text-foreground">Don&apos;t need a whole robot?</p>
              <p className="text-xs text-muted-foreground">Rent just 1/10th of one. Split costs with your community.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
