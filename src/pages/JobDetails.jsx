import { useParams, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Briefcase, MapPin, DollarSign, Clock, Users, ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const JobDetails = () => {
    const { id } = useParams();
    const { jobs } = useJobs();
    const job = jobs.find(j => j.id === parseInt(id));

    if (!job) return <div>Job not found</div>;

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container py-12 px-6">
                <Link to="/jobs" className="flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-10 font-bold outfit">
                    <ArrowLeft size={18} /> Back to Job Listings
                </Link>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <main className="flex-1">
                        <header className="mb-12">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-3xl font-extrabold outfit border border-primary/20">
                                    {job.company[0]}
                                </div>
                                <div className="flex flex-col items-end gap-3">
                                    <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full text-sm font-bold uppercase tracking-wider">
                                        {job.type}
                                    </span>
                                    <div className="flex items-center gap-2 text-text-muted font-bold"><Clock size={16} /> Posted {job.postedDate}</div>
                                </div>
                            </div>

                            <h1 className="text-5xl font-extrabold outfit mb-4 text-white">{job.title}</h1>
                            <p className="text-2xl text-text-muted mb-8 outfit font-medium">{job.company}</p>

                            <div className="flex flex-wrap gap-8 py-8 border-y border-border">
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-bold uppercase tracking-widest text-text-muted">Location</span>
                                    <div className="flex items-center gap-2 text-white font-bold outfit"><MapPin size={20} className="text-secondary" /> {job.location}</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-bold uppercase tracking-widest text-text-muted">Salary</span>
                                    <div className="flex items-center gap-2 text-white font-bold outfit"><DollarSign size={20} className="text-success" /> {job.salary}</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-bold uppercase tracking-widest text-text-muted">Teamsize</span>
                                    <div className="flex items-center gap-2 text-white font-bold outfit"><Users size={20} className="text-primary" /> 50 - 150 People</div>
                                </div>
                            </div>
                        </header>

                        <article className="prose prose-invert max-w-none text-text-muted leading-relaxed">
                            <h3 className="text-2xl font-bold text-white outfit mb-4">About the Role</h3>
                            <p className="mb-6">{job.description} Join our world-class team as we build innovative solutions for global markets. You'll work with modern technologies and a diverse team of engineers.</p>

                            <h4 className="text-xl font-bold text-white outfit mb-4">What you'll do</h4>
                            <ul className="list-disc pl-6 space-y-3 mb-8">
                                <li>Design and implement scalable frontend features using React and Vite.</li>
                                <li>Collaborate with cross-functional teams to define product requirements.</li>
                                <li>Maintain high-quality code through testing and peer reviews.</li>
                                <li>Optimize application performance for millions of users worldwide.</li>
                            </ul>
                        </article>
                    </main>

                    {/* Sidebar CTA */}
                    <aside className="w-full lg:w-96">
                        <div className="glass p-10 rounded-3xl sticky top-32 border-primary/20 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -z-10" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-3xl -z-10" />

                            <h3 className="text-2xl font-bold outfit mb-4 text-white">Apply Now</h3>
                            <p className="text-text-muted mb-8 text-sm leading-relaxed">
                                Take the next step in your career. Submit your application and our team will get back to you shortly.
                            </p>

                            <Link to={`/jobs/${job.id}/apply`} className="btn btn-primary w-full py-4 text-xl font-extrabold mb-6 shadow-xl hover:shadow-primary/50">
                                Submit Application <ChevronRight size={20} />
                            </Link>

                            <div className="pt-8 border-t border-border flex flex-col gap-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-text-muted font-bold outfit uppercase tracking-widest">Applicants</span>
                                    <span className="text-white font-bold">12 Active</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-text-muted font-bold outfit uppercase tracking-widest">Views</span>
                                    <span className="text-white font-bold">156 Total</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default JobDetails;
