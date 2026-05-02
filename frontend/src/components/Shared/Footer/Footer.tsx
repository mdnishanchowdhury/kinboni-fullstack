"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
import { Phone, Mail, MapPin, ChevronRight, ArrowUp } from "lucide-react";

import logo from "../../../../public/image/logo/logoT.png";
import { Button } from "../../ui/button";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const footerLinks = {
        about: [
            "About Us",
            "Terms & Conditions",
            "Careers",
            "Latest News",
            "Contact Us",
            "Privacy Policy",
        ],
        account: [
            "Your Account",
            "Return Policies",
            "Become a Vendor",
            "Wishlist",
            "Affiliate Program",
            "FAQs",
        ],
        categories: [
            "Healthcare",
            "Fashion",
            "Organic",
            "Beauty",
            "Groceries",
            "Electronics"
        ],
    };

    return (
        <footer className="bg-[#F8F9FA] text-[#333333] pt-16 pb-8 px-4 md:px-10 border-t border-gray-200">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">

                    {/* Logo & Social Section */}
                    <div className="lg:col-span-1">
                        <Link href="/">
                            <Image src={logo} alt="Kinboni" width={144} height={40} className="mb-6 object-contain" />
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed mb-8">
                            Experience the best online shopping with Kinboni. High quality products delivered right to your doorstep.
                        </p>
                        <div className="flex gap-2 mb-8">
                            {[FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube].map((Icon, idx) => (
                                <Link
                                    key={idx}
                                    href="#"
                                    className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-green-500 hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                >
                                    <Icon size={16} />
                                </Link>
                            ))}
                        </div>
                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-wider mb-4 text-gray-900">
                                Download Our App:
                            </h4>
                            <div className="flex flex-col gap-3">
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                    alt="Play Store"
                                    width={128}
                                    height={40}
                                    className="cursor-pointer object-contain"
                                />
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                    alt="App Store"
                                    width={128}
                                    height={40}
                                    className="cursor-pointer object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <FooterLinkGroup title="About" links={footerLinks.about} />
                    <FooterLinkGroup title="My Account" links={footerLinks.account} />
                    <FooterLinkGroup title="Categories" links={footerLinks.categories} />

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-8 text-gray-900">Contact Information</h3>
                        <ul className="space-y-5 text-sm text-gray-600">
                            <ContactItem
                                Icon={MapPin}
                                text="2715 Ash Dr. San Jose, South Dakota 83475"
                            />
                            <ContactItem
                                Icon={Phone}
                                text="Call Us: (239) 555-0108"
                            />
                            <ContactItem
                                Icon={Mail}
                                text="sara.cruz@example.com"
                            />
                        </ul>

                        <div className="mt-10 flex flex-wrap gap-2">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                                alt="Mastercard"
                                width={40}
                                height={24}
                                className="bg-white px-1 border border-gray-100 rounded"
                            />
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                alt="Paypal"
                                width={60}
                                height={24}
                                className="bg-white px-1 border border-gray-100 rounded"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="pt-8 border-t border-gray-200 relative flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 font-medium text-center md:text-left">
                        © 2026 Copyright Powered By Kinboni
                    </p>

                    <Button
                        variant="default"
                        size="icon"
                        onClick={scrollToTop}
                        className="w-12 h-12 bg-green-500 rounded-full shadow-lg hover:bg-black transition-all duration-300 group shrink-0"
                    >
                        <ArrowUp size={20} className="text-white group-hover:-translate-y-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </footer>
    );
};

const FooterLinkGroup = ({ title, links }: { title: string; links: string[] }) => (
    <div>
        <h3 className="text-lg font-bold mb-8 text-gray-900">{title}</h3>
        <ul className="space-y-4 text-sm text-gray-600">
            {links.map((link) => (
                <li key={link} className="flex items-center gap-2 hover:text-green-600 cursor-pointer group transition-all">
                    <ChevronRight size={14} className="text-green-500" />
                    <Link href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</Link>
                </li>
            ))}
        </ul>
    </div>
);

const ContactItem = ({ Icon, text }: { Icon: any; text: string }) => (
    <li className="flex gap-4 items-center">
        <div className="w-10 h-10 rounded-full bg-[#E6F6EF] flex items-center justify-center shrink-0 border border-[#CCE9DD]">
            <Icon size={18} className="text-green-500" />
        </div>
        <span>{text}</span>
    </li>
);

export default Footer;