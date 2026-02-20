"use client";

import { useState, useMemo } from "react";
import { MOCK_ROBOTS } from "@/data/robots";
import { RobotCard } from "@/components/listings/RobotCard";
import MapComponent from "@/components/map";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Gift } from "lucide-react";

const ROBOT_TYPES = ["All", "Humanoid", "Aerial", "Quadruped", "Industrial", "Agricultural", "Medical", "Marine", "Culinary", "Delivery", "Security", "Educational"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDonateModal, setShowDonateModal] = useState(false);

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
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-card sticky top-0 z-30 w-full shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg font-bold">R</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">RoboShare</span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium hidden sm:inline-block">Beta</span>
        </div>
        <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium">
          <a href="#" className="hover:text-primary transition-colors px-2 py-1">Browse</a>
          <a href="#" className="hover:text-primary transition-colors px-2 py-1">My Robots</a>
          <a href="#" className="hover:text-primary transition-colors px-2 py-1">Wallet</a>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-green-300 text-green-700 hover:bg-green-50"
            onClick={() => setShowDonateModal(true)}
          >
            <Gift className="w-3.5 h-3.5" />
            Donate Time
          </Button>
          <Button size="sm">List a Robot</Button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
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

      {/* Donate Time Modal */}
      {showDonateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDonateModal(false)}>
          <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Donate Robot Time</h3>
                <p className="text-sm text-muted-foreground">Help your community get things done</p>
              </div>
            </div>

            <p className="text-sm text-foreground/80">
              Donate unused robot hours to community members who need them. Your contribution helps reduce the need for individual robot ownership.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Hours to Donate</label>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={24}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Robot Type Preference</label>
                <select className="w-full border rounded-lg px-3 py-2 text-sm bg-background">
                  <option>Any Robot</option>
                  <option>Humanoid</option>
                  <option>Aerial</option>
                  <option>Quadruped</option>
                  <option>Industrial</option>
                  <option>Agricultural</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Message (optional)</label>
                <textarea
                  placeholder="Who should this benefit? Any specific task?"
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-background resize-none h-20"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowDonateModal(false)}>Cancel</Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => {
                alert("🎉 Thank you for donating robot time to your community!");
                setShowDonateModal(false);
              }}>
                Donate Time
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
