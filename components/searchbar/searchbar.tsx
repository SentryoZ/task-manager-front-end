import React from "react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="relative md:w-[295px] items-center space-x-2 hidden md:flex">
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-0.75"
      />
      <CiSearch className="absolute right-2 h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default SearchBar;
