import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SongItem from './SongItem';

const Search = () => {
    const [query, setQuery] = useState(''); 
    const [results, setResults] = useState([]); 
    const inputRef = useRef(null); 

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                setResults([]); 
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/song/search/${query}`);
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults([]); 
            }
        };

        fetchResults();
    }, [query]);

    return (
        <>
            <div className="p-4 text-white bg-[#121212]">
                <input
                    type="text"
                    ref={inputRef} 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search songs here"
                    className="w-full p-2 rounded bg-[#242424] text-white"
                />
            </div>

            {results.length > 0 ? (
                <div className="mb-4">
                    <h1 className="my-5 font-bold text-2xl text-white">Top Results</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {results.map((item, index) => (
                                <SongItem
                                    key={index}
                                    image={item.image}
                                    name={item.name}
                                    desc={item.desc}
                                    id={item._id}
                                    className="w-full"
                                />
                            ))}
                        </div>
                </div>
            
            ) : (
                query.trim() && <p className="text-gray-400">No results found</p>
            )}
        </>
    );
};

export default Search;
