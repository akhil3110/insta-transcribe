import { Github, Twitter, Linkedin } from 'lucide-react';
import { Logo } from './logo';
import Link from 'next/link';


const productLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#how-it-works', label: 'How it Works' },
];

const companyLinks = [
  { href: '#', label: 'About' },
  { href: '#', label: 'Blog' },
  { href: '#', label: 'Careers' },
];

const socialLinks = [
  { Icon: Github, href: '#', label: 'GitHub' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const Footer = () => {
    return ( 
        <footer className="bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1">
                        <Logo />
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            Transform your short-form videos with AI-powered transcription. Perfect for creators on TikTok, Instagram, and YouTube Shorts.
                        </p>
                    </div>
                    <FooterColumn title="Product" links={productLinks} />
                    <FooterColumn title="Company" links={companyLinks} />
                    <div className='col-span-1'>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                            Connect
                        </h3>
                        <div className="mt-4 flex space-x-6">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                                    aria-label={label}
                                >
                                    <Icon className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                    <p className="text-gray-400 text-sm text-center">
                        © {new Date().getFullYear()} SnapScript. All rights reserved.
                    </p>
                </div>
            </div>
    </footer>
     );
}
 
export default Footer;


interface FooterLink {
    href: string;
    label: string;
  }
  
  interface FooterColumnProps {
    title: string;
    links: FooterLink[];
  }

function FooterColumn({ title, links }: FooterColumnProps) {
    return (
      <div className='col-span-1'>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">{title}</h3>
        <ul className="mt-4 space-y-4">
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-indigo-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }