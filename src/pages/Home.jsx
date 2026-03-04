import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { useJobs } from '../context/JobContext';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Globe } from 'lucide-react';

const Home = () => {
    const { jobs } = useJobs();

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="container py-20 relative text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 border-primary/30">
                        <Sparkles size={16} className="text-yellow-400" />
                        <span className="text-sm font-bold tracking-wider uppercase text-primary">Next-Gen Recruitment Platform</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-extrabold outfit mb-8 leading-tight">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-secondary">Dream Job</span><br />
                        with JobSphere
                    </h1>

                    <p className="text-text-muted text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Discover opportunities at top tech companies and startups. We connect high-growth companies with exceptional talent.
                    </p>

                    <div className="max-w-4xl mx-auto mb-16">
                        <SearchBar onSearch={(q) => console.log(q)} />
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 mt-12 opacity-50">
                        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm"><Globe size={18} /> Remote First</div>
                        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm"><ShieldCheck size={18} /> Verified Tech</div>
                        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm"><TrendingUp size={18} /> Market Scale</div>
                    </div>
                </motion.div>

                {/* Decorative Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] -z-10 pointer-events-none" />
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
            </section>

            {/* Featured Jobs */}
            <section className="container py-20 px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-extrabold outfit text-white mb-2">Featured Opportunities</h2>
                        <p className="text-text-muted">Hand-picked roles from top employers this week.</p>
                    </div>
                    <Link to="/jobs" className="text-primary font-bold flex items-center gap-2 group">
                        Browse All Jobs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
