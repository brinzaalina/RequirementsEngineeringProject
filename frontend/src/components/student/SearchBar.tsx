import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void; // Callback when a search is performed
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
      <TextField
        label="Search Internships"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginRight: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
