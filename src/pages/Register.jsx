import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(name, email, password);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container flex items-center justify-center py-20 px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass p-12 rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-3xl -z-10" />

                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold outfit text-white mb-3">Join JobSphere</h1>
                        <p className="text-text-muted">Fill in your details to get started</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2 block">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted h-5 w-5" />
                                <input
                                    type="text"
                                    className="pl-12"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2 block">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted h-5 w-5" />
                                <input
                                    type="email"
                                    className="pl-12"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold uppercase tracking-widest text-text-muted mb-2 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted h-5 w-5" />
                                <input
                                    type="password"
                                    className="pl-12"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full py-4 text-xl font-bold mt-4 shadow-lg">
                            <UserPlus className="w-6 h-6" /> Create Account
                        </button>
                    </form>

                    <footer className="mt-10 text-center text-text-muted">
                        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in here</Link>
                    </footer>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
