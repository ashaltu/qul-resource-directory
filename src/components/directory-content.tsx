"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, ExternalLink, Shuffle, Github, Globe, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  resources,
  searchResources,
  shuffleArray,
  categoryLabels,
  categoryColors,
  type Resource,
  type ResourceCategory,
} from "@/lib/data";

function ResourceCard({ resource }: { resource: Resource }) {
  const isGithub = resource.url.includes("github.com");

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors truncate">
              {resource.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {resource.description}
          </p>
        </div>
        <div className="flex-shrink-0">
          {isGithub ? (
            <Github className="w-5 h-5 text-muted-foreground" />
          ) : resource.category === "app" ? (
            <Smartphone className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Globe className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge className={`${categoryColors[resource.category]} text-xs font-medium border-0`}>
          {categoryLabels[resource.category]}
        </Badge>
        {resource.platform?.slice(0, 2).map((p) => (
          <Badge key={p} variant="outline" className="text-xs">
            {p}
          </Badge>
        ))}
      </div>
    </a>
  );
}

function CategoryFilter({
  categories,
  selected,
  onSelect,
}: {
  categories: ResourceCategory[];
  selected: ResourceCategory | null;
  onSelect: (cat: ResourceCategory | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect(null)}
        className="rounded-full"
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selected === cat ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(cat)}
          className="rounded-full"
        >
          {categoryLabels[cat]}
        </Button>
      ))}
    </div>
  );
}

export function DirectoryContent() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | null>(null);
  const [shuffledResources, setShuffledResources] = useState<Resource[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setShuffledResources(shuffleArray(resources));
  }, []);

  const handleShuffle = () => {
    setShuffledResources(shuffleArray(resources));
  };

  const filteredResources = useMemo(() => {
    let result = searchResources(search, shuffledResources);
    if (selectedCategory) {
      result = result.filter((r) => r.category === selectedCategory);
    }
    return result;
  }, [search, selectedCategory, shuffledResources]);

  const categories = useMemo(() => {
    const cats = new Set(resources.map((r) => r.category));
    return Array.from(cats);
  }, []);

  if (!isClient) {
    return (
      <div className="space-y-8">
        <div className="h-12 bg-muted animate-pulse rounded-xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-40 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tools, apps, websites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 rounded-xl bg-card border-border text-base"
          />
        </div>
        <Button
          variant="outline"
          onClick={handleShuffle}
          className="h-12 px-6 rounded-xl gap-2"
        >
          <Shuffle className="w-4 h-4" />
          Shuffle
        </Button>
      </div>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No resources found matching your search.</p>
          <Button variant="link" onClick={() => { setSearch(""); setSelectedCategory(null); }} className="mt-2">
            Clear filters
          </Button>
        </div>
      )}

      <div className="text-center pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {filteredResources.length} of {resources.length} resources
        </p>
      </div>
    </div>
  );
}
