import React, { useContext } from 'react';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';

const Search = () => {

    const { SearchSong,filteredData } = useContext(PlayerContext)

    return (
        <>
            <div className="p-4 text-white bg-[#121212]">
                <input
                    type="text"
                    onChange={SearchSong}
                    placeholder="Search songs here"
                    className="w-full p-2 rounded bg-[#242424] text-white"
                />
            </div>

            {filteredData.length === 0 ? (
                <p className="text-gray-400 text-center my-5">No results found</p>
            ) : (
                <div className="mb-4">
                    <h1 className="my-5 font-bold text-2xl text-white">Top Results</h1>
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10">
                            {filteredData.map((item, index) => (
                                <SongItem
                                    key={index}
                                    image={item.image}
                                    name={item.name}
                                    desc={item.desc}
                                    id={item._id}
                                />
                            ))}
                        </div>
                </div>
            )}
        </>
    );
};

export default Search;
