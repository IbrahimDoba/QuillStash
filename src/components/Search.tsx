import { searchPosts } from "@/lib/service";
import useDebounce from "@/lib/useDebounce";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import SearchResults from "./SearchResults";

interface Post {
  id: number;
  title: string;
  tags: string[];
  username: string;
  slug: string;
}

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      searchPosts(debouncedSearchTerm)
        .then((data) => {
          setResults(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Search failed:", error);
          setResults([]);
          setIsLoading(false);
          // Optionally, set an error state here to display to the user
        });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="relative">
      <Input
        classNames={{
          base: "max-w-full ml-4 md:w-[20rem] h-10 max-lg:hidden",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Search silver..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      {!isLoading && results.length > 0 && <SearchResults results={results} />}
    </div>
  );
}

export default Search;
