import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer bg-surface py-12 mt-20 border-t border-border">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                <div className="col-span-1 md:col-span-1">
                    <h3 className="text-2xl font-bold outfit mb-4 text-white">JobSphere</h3>
                    <p className="text-text-muted mb-4 max-w-sm">
                        Connecting the next generation of talent with the world's most innovative companies.
                    </p>
                    <div className="flex gap-4 items-center justify-center md:justify-start">
                        <Github className="text-text-muted hover:text-white transition-colors cursor-pointer" />
                        <Twitter className="text-text-muted hover:text-white transition-colors cursor-pointer" />
                        <Linkedin className="text-text-muted hover:text-white transition-colors cursor-pointer" />
                        <Mail className="text-text-muted hover:text-white transition-colors cursor-pointer" />
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-4 outfit text-white">For Candidates</h4>
                    <ul className="text-text-muted space-y-2">
                        <li><a href="#" className="hover:text-primary transition-colors">Browse Jobs</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Career Advice</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Resume Tips</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 outfit text-white">For Employer</h4>
                    <ul className="text-text-muted space-y-2">
                        <li><a href="#" className="hover:text-primary transition-colors">Post a Job</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Talent Solutions</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Pricing Plans</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 outfit text-white">Join Our Newsletter</h4>
                    <p className="text-text-muted text-sm mb-4">Latest job tips and news right in your inbox.</p>
                    <form className="flex gap-2">
                        <input type="email" placeholder="Email address" className="py-2 text-sm" />
                        <button className="btn btn-primary py-2 px-4 text-sm font-bold">Join</button>
                    </form>
                </div>
            </div>
            <div className="container mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted font-medium">
                <p>&copy; 2024 JobSphere Inc. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Cookies</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
