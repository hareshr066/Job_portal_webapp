import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, LogOut, LayoutDashboard, Search, Home as HomeIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass sticky top-0 z-50 py-4 mb-8">
            <div className="container flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Briefcase size={24} />
                    </div>
                    <span className="text-2xl font-bold outfit bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        JobSphere
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link to="/" className="text-text-muted hover:text-white transition-colors flex items-center gap-2">
                        <HomeIcon size={18} /> Home
                    </Link>
                    <Link to="/jobs" className="text-text-muted hover:text-white transition-colors flex items-center gap-2">
                        <Search size={18} /> Browse Jobs
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-6 border-l border-border pl-6">
                            <Link to="/dashboard" className="text-text-muted hover:text-white transition-colors flex items-center gap-2">
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-text-muted hover:text-white transition-colors">Admin Panel</Link>
                            )}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold">
                                    {user.name[0]}
                                </div>
                                <button onClick={handleLogout} className="text-text-muted hover:text-error transition-colors">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-text-muted hover:text-white transition-colors">Login</Link>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
