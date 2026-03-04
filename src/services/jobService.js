import api from './api';

const jobService = {
    getAllJobs: async () => {
        try {
            const response = await api.get('/jobs');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getJobById: async (id) => {
        try {
            const response = await api.get(`/jobs/${id}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    applyForJob: async (jobId, applicationData) => {
        try {
            const response = await api.post(`/jobs/${jobId}/apply`, applicationData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
};

export default jobService;
