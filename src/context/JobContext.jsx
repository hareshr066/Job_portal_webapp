import { createContext, useContext, useState } from 'react';

const JobContext = createContext();

const MOCK_JOBS = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechFlow',
        location: 'Remote',
        salary: '$120k - $160k',
        type: 'Full-time',
        description: 'We are looking for a React expert to lead our dashboard redesign...',
        postedDate: '2 days ago'
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'Luminary UI',
        location: 'New York, NY',
        salary: '$100k - $140k',
        type: 'Hybrid',
        description: 'Join our design system team and build the future of our product...',
        postedDate: '5 hours ago'
    },
    {
        id: 3,
        title: 'Backend Engineer',
        company: 'Scalable Systems',
        location: 'Austin, TX',
        salary: '$130k - $170k',
        type: 'Full-time',
        description: 'Help us scale our microservices architecture to millions of users...',
        postedDate: '1 week ago'
    }
];

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState(MOCK_JOBS);
    const [applications, setApplications] = useState([]);

    const applyForJob = (jobId, userData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newApplication = {
                    id: Date.now(),
                    jobId,
                    status: 'pending',
                    appliedAt: new Date().toISOString()
                };
                setApplications(prev => [...prev, newApplication]);
                resolve(newApplication);
            }, 800);
        });
    };

    const searchJobs = (query) => {
        if (!query) return setJobs(MOCK_JOBS);
        const filtered = MOCK_JOBS.filter(job =>
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.company.toLowerCase().includes(query.toLowerCase())
        );
        setJobs(filtered);
    };

    return (
        <JobContext.Provider value={{ jobs, applications, applyForJob, searchJobs }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => useContext(JobContext);
