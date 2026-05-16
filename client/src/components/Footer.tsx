"use client";
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center font-bold text-xl">P</div>
                        <span className="text-2xl font-bold tracking-tight text-white">PlaceMint</span>
                    </div>
                    <p className="text-gray-400 max-w-sm mb-8">
                        The ultimate preparation platform for B.Tech students. 
                        Join thousands of students and crack your dream company.
                    </p>
                </div>
                
                <div>
                    <h4 className="font-bold text-white mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><Link href="/dsa" className="hover:text-primary transition-colors">DSA Sheets</Link></li>
                        <li><Link href="/videos" className="hover:text-primary transition-colors">Interview Videos</Link></li>
                        <li><Link href="/resume-builder" className="hover:text-primary transition-colors">Resume Builder</Link></li>
                        <li><Link href="/dashboard" className="hover:text-primary transition-colors">Student Dashboard</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Support</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Contact Support</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
                <p>© 2024 PlaceMint. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
