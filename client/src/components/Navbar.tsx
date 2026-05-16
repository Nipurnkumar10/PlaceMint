"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, Video, FileText, Menu, X, Brain } from 'lucide-react';
import { useState } from 'react';
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isSignedIn, isLoaded } = useUser();

    const navLinks = [
        { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'DSA Sheets', href: '/dsa', icon: <BookOpen size={20} /> },
        { name: 'Aptitude', href: '/aptitude', icon: <Brain size={20} /> },
        { name: 'Videos', href: '/videos', icon: <Video size={20} /> },
        { name: 'Resume', href: '/resume-builder', icon: <FileText size={20} /> },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <motion.div 
                        initial={{ rotate: -10 }}
                        whileHover={{ rotate: 0 }}
                        className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center font-bold text-xl"
                    >
                        P
                    </motion.div>
                    <span className="text-2xl font-bold tracking-tight text-white">PlaceMint</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href}
                            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 font-medium"
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                    
                    <div className="flex items-center gap-4">
                        {isLoaded && !isSignedIn && (
                            <>
                                <SignInButton mode="modal">
                                    <button className="text-gray-300 hover:text-white font-semibold">Login</button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-full font-semibold transition-all">
                                        Sign Up
                                    </button>
                                </SignUpButton>
                            </>
                        )}
                        {isLoaded && isSignedIn && (
                            <UserButton />
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 right-0 glass border-b border-white/10 p-6 flex flex-col gap-6"
                >
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white flex items-center gap-4 text-lg"
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                        {isLoaded && !isSignedIn && (
                            <>
                                <SignInButton mode="modal">
                                    <button className="text-center font-bold text-gray-300 py-2">Login</button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="bg-primary px-6 py-3 rounded-xl text-center font-bold">Sign Up</button>
                                </SignUpButton>
                            </>
                        )}
                        {isLoaded && isSignedIn && (
                            <div className="flex justify-center">
                                <UserButton />
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
