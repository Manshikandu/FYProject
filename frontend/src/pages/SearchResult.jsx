import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const queryParam = new URLSearchParams(useLocation().search);
  const query = queryParam.get('query');

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:5000/api/artist/search?query=${encodeURIComponent(query)}`)
        .then(res => setResults(res.data))
        .catch(err => console.error("Search error:", err));
    }
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No artists found.</p>
      ) : (
        results.map(artist => (
          <div key={artist._id} className="p-4 border rounded mb-3">
            <p><strong>{artist.username || artist.name}</strong></p>
            <p>Category: {artist.category}</p>
            <p>Location: {artist.location}</p>
            <p>Style: {artist.style}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResult;
