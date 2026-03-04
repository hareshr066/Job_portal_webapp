import { useJobs } from '../context/JobContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Settings, Users, Briefcase, BarChart, Plus, Eye, Trash, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPanel = () => {
    const { jobs } = useJobs();

    const adminStats = [
        { label: 'Active Jobs', value: jobs.length, icon: Briefcase, color: 'text-primary' },
        { label: 'Total Users', value: 1256, icon: Users, color: 'text-secondary' },
        { label: 'Applications', value: 489, icon: BarChart, color: 'text-indigo-400' },
        { label: 'Settings', value: 'Live', icon: Settings, color: 'text-success' },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container py-12 px-6">
                <header className="flex items-center justify-between mb-16">
                    <div>
                        <motion.h1
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-5xl font-extrabold outfit mb-2 text-white"
                        >
                            Control Center ⚡
                        </motion.h1>
                        <p className="text-text-muted text-xl">Manage listings, candidates, and platform performance.</p>
                    </div>
                    <button className="btn btn-primary px-8 py-4 text-lg font-extrabold shadow-xl hover:shadow-primary/50">
                        <Plus size={24} /> Post New Job
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    {adminStats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-8 rounded-3xl flex flex-col items-center text-center shadow-lg relative h-full overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-2xl -z-10" />
                            <stat.icon size={36} className={`${stat.color} mb-4`} />
                            <div className="text-4xl font-extrabold outfit text-white mb-1">{stat.value}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-text-muted">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Listings Table */}
                <div className="glass rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 font-bold uppercase tracking-widest text-sm text-text-muted">
                                <th className="px-8 py-6 text-center">Org</th>
                                <th className="px-8 py-6">Job Posting & Company</th>
                                <th className="px-8 py-6 text-center">Applicants</th>
                                <th className="px-8 py-6 text-center">Status</th>
                                <th className="px-8 py-6 text-right">Internal Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {jobs.map((job, idx) => (
                                <tr key={job.id} className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors group ${idx === jobs.length - 1 ? 'border-none' : ''}`}>
                                    <td className="px-8 py-6 text-center">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-extrabold outfit text-primary text-xl mx-auto group-hover:scale-110 transition-transform">
                                            {job.company[0]}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-white font-extrabold text-lg outfit">{job.title}</div>
                                        <div className="text-text-muted text-xs font-bold uppercase tracking-wider">{job.company} • {job.location}</div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="font-extrabold outfit text-lg text-white">42</span>
                                        <p className="text-[10px] text-text-muted font-bold uppercase">Pending Check</p>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3 text-text-muted">
                                            <button className="p-3 hover:bg-white/5 hover:text-white rounded-xl transition-all"><Eye size={18} /></button>
                                            <button className="p-3 hover:bg-white/5 hover:text-white rounded-xl transition-all"><Edit size={18} /></button>
                                            <button className="p-3 hover:bg-white/5 hover:text-error rounded-xl transition-all"><Trash size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminPanel;
