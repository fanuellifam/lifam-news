import Link from 'next/link';
import { Twitter, Facebook, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Lifam News</h3>
          <p className="text-sm text-gray-400">
            Trusted, independent, global. Delivering the stories that matter.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Sections</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/category/world" className="hover:text-white transition">World</Link></li>
            <li><Link href="/category/politics" className="hover:text-white transition">Politics</Link></li>
            <li><Link href="/category/technology" className="hover:text-white transition">Technology</Link></li>
            <li><Link href="/category/africa" className="hover:text-white transition">Africa</Link></li>
            <li><Link href="/category/investigations" className="hover:text-white transition">Investigations</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
            <li><Link href="/advertise" className="hover:text-white transition">Advertise</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-white transition">
              <Github className="h-5 w-5" />
            </a>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-2">Get top stories in your inbox.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm rounded-l bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white text-sm rounded-r hover:bg-primary/90 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Lifam Inc. All rights reserved.
      </div>
    </footer>
  );
}
