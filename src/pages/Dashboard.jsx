import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Briefcase, Clock, CheckCircle, TrendingUp, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user } = useAuth();
    const { applications, jobs } = useJobs();

    const userApplications = applications.map(app => ({
        ...app,
        job: jobs.find(j => j.id === app.jobId)
    }));

    const stats = [
        { label: 'Total Applications', value: userApplications.length, icon: Briefcase, color: 'text-primary' },
        { label: 'Pending Review', value: userApplications.filter(a => a.status === 'pending').length, icon: Clock, color: 'text-secondary' },
        { label: 'Interviews', value: 0, icon: TrendingUp, color: 'text-indigo-400' },
        { label: 'Offers', value: 0, icon: CheckCircle, color: 'text-success' },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container py-12 px-6">
                <header className="mb-12">
                    <motion.h1
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-4xl font-extrabold outfit mb-2"
                    >
                        Welcome, {user?.name} 👋
                    </motion.h1>
                    <p className="text-text-muted">Track your applications and career progress.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            key={stat.label}
                            className="glass p-6 rounded-2xl flex flex-col items-center text-center shadow-lg"
                        >
                            <stat.icon size={28} className={`${stat.color} mb-3`} />
                            <div className="text-3xl font-extrabold outfit text-white mb-1">{stat.value}</div>
                            <div className="text-sm font-bold uppercase tracking-widest text-text-muted">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold outfit">Recent Applications</h2>
                    <button className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-white transition-colors">
                        <Filter size={16} /> Filters
                    </button>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                    {userApplications.length > 0 ? (
                        userApplications.map((app, i) => (
                            <motion.div
                                key={app.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-6 rounded-2xl flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold outfit">
                                        {app.job.company[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{app.job.title}</h3>
                                        <p className="text-sm text-text-muted">{app.job.company} • Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-xs font-bold uppercase tracking-widest">
                                        {app.status}
                                    </span>
                                    <button className="text-text-muted hover:text-white font-bold text-sm underline underline-offset-4">View Details</button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="glass p-20 text-center rounded-3xl opacity-50 border-dashed">
                            <p className="text-xl font-medium mb-4">You haven't applied to any jobs yet.</p>
                            <button className="btn btn-primary px-8">Browse Opportunities</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
