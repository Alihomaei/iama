import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { label: "X (Twitter)", short: "X", href: "https://x.com/IAMA_1993" },
  {
    label: "Facebook",
    short: "Fb",
    href: "https://www.facebook.com/IranianAmericanMedicalAssociation",
  },
  {
    label: "Instagram",
    short: "Ig",
    href: "https://www.instagram.com/iranian_american_medical_assoc/",
  },
  {
    label: "YouTube",
    short: "Yt",
    href: "https://www.youtube.com/channel/UCwsuL_Mk7yshLEFy3MgOsGg",
  },
];

const aboutLinks = [
  { label: "Our Mission", href: "/about" },
  { label: "Leadership", href: "/about#leadership" },
  { label: "History", href: "/about#history" },
  { label: "Contact Us", href: "/about#contact" },
];

const quickLinks = [
  { label: "Membership", href: "/membership" },
  { label: "Annual Congress", href: "/congress" },
  { label: "Submit Abstract", href: "/abstracts/submit" },
  { label: "Find a Doctor", href: "/directory" },
];

const resourceLinks = [
  { label: "Education & CME", href: "/education" },
  { label: "News", href: "/news" },
  { label: "Advocacy", href: "/advocacy" },
  { label: "Member Dashboard", href: "/dashboard" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* About IAMA */}
          <div>
            <div className="mb-4 inline-flex rounded-lg bg-white px-4 py-2.5">
              <Image
                src="/logo-transparent.png"
                alt="Iranian American Medical Association"
                width={766}
                height={326}
                className="h-9 w-auto"
              />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              The Iranian American Medical Association advances healthcare
              excellence through education, research, advocacy, and community
              building among medical professionals.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-gray-300 hover:bg-primary hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.short}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-primary-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-primary-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Contact
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                <span>P.O. Box 8218, Haledon, NJ 07538</span>
              </li>
              <li>
                <a
                  href="mailto:iama@iama.org"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-primary-light transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary-light" />
                  iama@iama.org
                </a>
              </li>
              <li>
                <a
                  href="tel:+19735958888"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-primary-light transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary-light" />
                  (973) 595-8888
                </a>
              </li>
            </ul>

            {/* Newsletter signup */}
            <h4 className="mb-2 text-sm font-medium text-gray-400">
              Newsletter
            </h4>
            <form className="flex gap-2" action="#">
              <input
                type="email"
                placeholder="Your email"
                className="h-9 flex-1 rounded-md bg-white/10 px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-light"
              />
              <button
                type="submit"
                className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-white hover:bg-primary-dark transition-colors cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row lg:px-8">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Iranian American Medical
            Association. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
