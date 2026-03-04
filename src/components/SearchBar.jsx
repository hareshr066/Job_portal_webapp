import { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query, location);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSearch}
            className="glass p-3 rounded-2xl flex flex-col md:flex-row items-center gap-3 backdrop-blur-3xl shadow-2xl relative z-10"
        >
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r border-border md:w-auto w-full">
                <Search className="text-secondary" />
                <input
                    type="text"
                    placeholder="Job title, keywords, or company..."
                    className="bg-transparent border-none focus:ring-0 p-0 text-lg outfit"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r border-border md:w-auto w-full">
                <MapPin className="text-primary" />
                <input
                    type="text"
                    placeholder="City, state, or remote..."
                    className="bg-transparent border-none focus:ring-0 p-0 text-lg outfit"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <button className="btn btn-primary px-8 py-3 w-full md:w-auto text-lg hover:shadow-primary/50 transition-all font-bold">
                Search Jobs
            </button>
        </motion.form>
    );
};

export default SearchBar;
