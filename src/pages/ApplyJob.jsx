import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, CheckCircle, Upload, CheckSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ApplyJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { jobs, applyForJob } = useJobs();
    const { user } = useAuth();
    const job = jobs.find(j => j.id === parseInt(id));

    const [formData, setFormData] = useState({
        resume: null,
        coverLetter: '',
        experience: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await applyForJob(job.id, { ...formData, userId: user.id });
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass p-16 rounded-3xl text-center shadow-2xl relative"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-success/20 blur-3xl -z-10" />
                    <CheckCircle size={80} className="text-success mx-auto mb-8 shadow-success/50" />
                    <h1 className="text-4xl font-extrabold outfit text-white mb-4">Application Sent!</h1>
                    <p className="text-text-muted text-lg mb-8">Your application for <span className="text-white font-bold">{job?.title}</span> has been submitted successfully.</p>
                    <p className="text-sm text-text-muted italic">Redirecting to dashboard...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container py-12 px-6">
                <Link to={`/jobs/${id}`} className="flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-10 font-bold outfit">
                    <ArrowLeft size={18} /> Back to Job Details
                </Link>

                <div className="max-w-3xl mx-auto">
                    <motion.header
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-12 glass p-8 rounded-3xl border-primary/20"
                    >
                        <h1 className="text-4xl font-extrabold outfit text-white mb-2">Apply for {job?.title}</h1>
                        <p className="text-lg text-text-muted mb-4">{job?.company} • {job?.location}</p>
                        <div className="flex gap-4 items-center text-sm font-bold uppercase tracking-widest text-primary">
                            <CheckSquare size={16} /> 2 applicants needed
                        </div>
                    </motion.header>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="glass p-10 rounded-3xl shadow-xl">
                            <div className="mb-8">
                                <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4 block">Upload Resume (PDF)</label>
                                <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary transition-colors cursor-pointer group">
                                    <Upload className="mx-auto mb-4 text-text-muted group-hover:text-primary transition-colors" size={48} />
                                    <p className="text-text-muted font-bold outfit">Click to upload or drag & drop</p>
                                    <p className="text-xs text-text-muted mt-2 uppercase tracking-widest font-bold">PDF, DOCX up to 10MB</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4 block">Professional Experience (Years)</label>
                                <input
                                    type="number"
                                    className="w-full text-lg outfit"
                                    placeholder="e.g. 5"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4 block">Cover Letter / Message to Hiring Manager</label>
                                <textarea
                                    className="w-full h-48 text-lg outfit resize-none"
                                    placeholder="Tell us why you're a great fit for this role..."
                                    value={formData.coverLetter}
                                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary w-full py-5 text-xl font-extrabold shadow-xl hover:shadow-primary/50 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Processing Application...' : <span className="flex items-center gap-3 justify-center"><Send size={24} /> Submit Final Application</span>}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ApplyJob;
