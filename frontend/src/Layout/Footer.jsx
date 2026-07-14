import React, { useState } from 'react';
import { Shield, X, HelpCircle, Mail, Briefcase, FileText, Globe } from 'lucide-react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  const modalData = {
    terms: {
      title: 'Terms of Service',
      icon: FileText,
      content: `Welcome to LuxeServe. By accessing or using our premium platform, you agree to comply with and be bound by the following Terms of Service. Please read them carefully. All bookings are subject to the individual professional's agreement, and LuxeServe act solely as a secure matchmaking and booking agent. Secure payment escrows are implemented to protect both consumers and service elite professionals. Cancellation rules apply based on professional-specified terms.`
    },
    privacy: {
      title: 'Privacy Policy',
      icon: Shield,
      content: `Your security and trust are of paramount importance to LuxeServe. This privacy document details how we securely log user registration metadata, process payment credentials via secure backend gateways, and respect user localization lookups. LuxeServe does not sell or share any user private data to third-party brokers. We employ strict client-side sandboxes and industry-grade server protections.`
    },
    contact: {
      title: 'Direct Elite Concierge',
      icon: Mail,
      content: `For high-end clients requiring tailored, complex custom setups or on-premise consultations, our 24/7 Premium Concierge support is at your service. Please dispatch inquiries directly to concierge@luxeserve-expert.com. Response times for registered LuxeServe members average under 10 minutes, anywhere across the globe.`
    },
    careers: {
      title: 'Join the LuxeServe Team',
      icon: Briefcase,
      content: `We are perpetually searching for brilliant minds to join our global development and logistics hub. From design directors, technical lead architects, platform backend coders, to premium client representatives. Browse vacancies or dispatch your CV directly to careers@luxeserve-expert.com. All remote work structures are fully supported.`
    }
  };

  const handleOpenModal = (key) => {
    setActiveModal(key);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const activeInfo = activeModal ? modalData[activeModal] : null;
  const ModalIcon = activeInfo ? activeInfo.icon : HelpCircle;

  return (
    <>
      <footer className="w-full py-16 bg-[#060606] border-t border-zinc-900 mt-auto relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand/Logo column */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500 rounded-sm flex items-center justify-center">
                <Shield className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
              <span className="font-display text-lg font-bold text-white uppercase tracking-tighter">
                LuxeServe
              </span>
            </div>
            <p className="text-zinc-500 text-xs max-w-xs text-center md:text-left leading-relaxed">
              Elevating the standard of local service delivery for the discerning modern client with verified experts.
            </p>
          </div>

          {/* Interactive Modal-Triggering Navigation */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <button 
              id="footer-btn-terms"
              onClick={() => handleOpenModal('terms')}
              className="text-zinc-400 text-xs hover:text-orange-500 transition-colors cursor-pointer"
            >
              Terms
            </button>
            <button 
              id="footer-btn-privacy"
              onClick={() => handleOpenModal('privacy')}
              className="text-zinc-400 text-xs hover:text-orange-500 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button 
              id="footer-btn-contact"
              onClick={() => handleOpenModal('contact')}
              className="text-zinc-400 text-xs hover:text-orange-500 transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button 
              id="footer-btn-careers"
              onClick={() => handleOpenModal('careers')}
              className="text-zinc-400 text-xs hover:text-orange-500 transition-colors cursor-pointer"
            >
              Careers
            </button>
          </div>

          {/* Copyright text */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-zinc-600 text-[11px] font-mono">
              © {new Date().getFullYear()} LuxeServe Marketplace.
            </p>
            <p className="text-zinc-600/60 text-[9px] font-mono">
              All premium rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Info Interactive Modal Backdrop */}
      {activeInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop blur */}
          <div 
            onClick={handleCloseModal}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
          ></div>
          
          {/* Dialog Panel */}
          <div 
            data-aos="zoom-in"
            data-aos-duration="300"
            className="relative w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                <ModalIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {activeInfo.title}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-light">
                {activeInfo.content}
              </p>
            </div>

            {/* Modal Footer action */}
            <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-end">
              <button 
                onClick={handleCloseModal}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs py-2 px-6 rounded-full transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
