import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            className="glass p-6 rounded-2xl group transition-all border border-transparent hover:border-primary/30"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-bold outfit mb-1 text-white group-hover:text-primary transition-colors">
                        {job.title}
                    </h3>
                    <p className="text-text-muted font-medium flex items-center gap-2">
                        <Briefcase size={16} /> {job.company}
                    </p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    {job.type}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-text-muted text-sm">
                    <MapPin size={16} className="text-secondary" /> {job.location}
                </div>
                <div className="flex items-center gap-2 text-text-muted text-sm">
                    <DollarSign size={16} className="text-success" /> {job.salary}
                </div>
                <div className="flex items-center gap-2 text-text-muted text-sm col-span-2">
                    <Clock size={16} className="text-indigo-400" /> Posted {job.postedDate}
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs text-text-muted italic">
                    12 applicants applied
                </span>
                <Link to={`/jobs/${job.id}`} className="btn btn-secondary py-2 px-4 text-sm font-semibold">
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default JobCard;
