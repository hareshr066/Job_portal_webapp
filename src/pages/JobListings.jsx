import { useState } from 'react';
import { useJobs } from '../context/JobContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import { motion } from 'framer-motion';
import { Filter, Users, Briefcase, DollarSign } from 'lucide-react';

const JobListings = () => {
    const { jobs, searchJobs } = useJobs();
    const [filter, setFilter] = useState('All');

    const filteredJobs = filter === 'All'
        ? jobs
        : jobs.filter(j => j.type === filter);

    const handleSearch = (query, location) => {
        searchJobs(query);
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container py-12 px-6">
                <header className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl font-extrabold outfit mb-4 text-white"
                    >
                        Explore <span className="text-secondary">Careers</span> 🚀
                    </motion.h1>
                    <p className="text-text-muted text-xl">Browse our curated list of high-impact opportunities.</p>
                </header>

                <section className="mb-16">
                    <SearchBar onSearch={handleSearch} />
                </section>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-64 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
                                <Filter size={16} /> Filter by Type
                            </h3>
                            <div className="space-y-4">
                                {['All', 'Full-time', 'Contract', 'Remote', 'Hybrid'].map(type => (
                                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="type"
                                            className="w-4 h-4 text-primary bg-indigo-500 border-border focus:ring-primary"
                                            checked={filter === type}
                                            onChange={() => setFilter(type)}
                                        />
                                        <span className={`text-sm font-semibold transition-colors ${filter === type ? 'text-white' : 'text-text-muted group-hover:text-white'}`}>
                                            {type}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-6 rounded-2xl">
                            <h4 className="font-bold outfit mb-2 text-white flex items-center gap-2"><Briefcase size={16} /> Pro Tip</h4>
                            <p className="text-xs text-text-muted leading-relaxed">
                                Applying to jobs with tailored resumes increases your chances by 40%. Check our career advice!
                            </p>
                        </div>
                    </aside>

                    {/* Jobs Grid */}
                    <main className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <div className="text-sm font-bold text-text-muted italic">{filteredJobs.length} available roles matching your search</div>
                            <div className="flex gap-4">
                                <button className="btn btn-secondary py-2 px-4 text-xs font-bold uppercase tracking-widest">Newest First</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map(job => (
                                    <JobCard key={job.id} job={job} />
                                ))
                            ) : (
                                <div className="col-span-2 glass p-20 text-center rounded-3xl opacity-50 border-dashed">
                                    <p className="text-xl font-medium">No results found for your search.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default JobListings;
