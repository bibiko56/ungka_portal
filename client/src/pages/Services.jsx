import React from 'react';
import ServicesBanner from '../components/ServicesBanner';
import {
  MessageSquareWarning, Gavel, HelpCircle, Award, FileCheck, IdCard, Receipt,
  Stethoscope, Bug, Baby, Syringe, Pill, HeartHandshake, ClipboardCheck,
  Apple, Bandage, FileText, BookOpen,
} from 'lucide-react';

const barangayHallServices = [
  { icon: MessageSquareWarning, title: 'Complaints', description: 'Filing official reports, blotters, or disputes for local dispute resolution (Katarungang Pambarangay).' },
  { icon: Gavel, title: 'Summon', description: 'Issuing formal notices or summonses for involved parties to attend barangay conciliation sessions.' },
  { icon: HelpCircle, title: 'Inquiries', description: 'Processing general questions regarding local barangay records, requirements, fees, and government programs.' },
  { icon: Award, title: 'Certification', description: 'Issuing official barangay certificates, clearances, and endorsements for employment, business, or government requirements.' },
  { icon: FileCheck, title: 'Certificate of Residency', description: 'Processing official clearance permits for residency verification, business operations, and legal applications.' },
  { icon: IdCard, title: 'Cedula', description: 'Securing a Community Tax Certificate (CTC), an essential government-issued identification document.' },
  { icon: Receipt, title: 'Official Receipts', description: 'Issuing proof of payment for local fees, permits, taxes, or other financial transactions processed by the office.' },
];

const healthCenterServices = [
  { icon: Stethoscope, title: 'Medical Consultation', description: 'Provides basic check-ups, consultations, and health advice for residents.' },
  { icon: Bug, title: 'Dengue Prevention', description: 'Provides information and guidance on preventing dengue and controlling mosquito breeding.' },
  { icon: Baby, title: 'Child Health', description: 'Growth monitoring, nutrition assessment, and health check-ups for children.' },
  { icon: Syringe, title: 'Immunization', description: 'Offers routine vaccinations to help protect children and residents from diseases.' },
  { icon: Pill, title: 'Medicine Assistance', description: 'Helps residents access available medicines for common health conditions.' },
  { icon: HeartHandshake, title: 'Maternal Care', description: 'Comprehensive check-ups and nutritional monitoring for expecting mothers and infants.' },
  { icon: ClipboardCheck, title: 'Health Screening', description: 'Basic monitoring such as blood pressure, temperature, and other available screenings.' },
  { icon: Apple, title: 'Nutrition Services', description: 'Nutrition counseling and monitoring for children, mothers, and other residents.' },
  { icon: Bandage, title: 'First Aid', description: 'Assistance for minor injuries and common health concerns.' },
  { icon: FileText, title: 'Health Records', description: 'Assistance with available health-related records and certifications.' },
  { icon: BookOpen, title: 'Health Education', description: 'Information campaigns about sanitation, hygiene, disease prevention, and healthy living.' },
];

function ServiceCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md hover:border-emerald-700/40 transition-all">
      <div className="w-11 h-11 rounded-xl border-2 border-[#1e3e2b] flex items-center justify-center flex-shrink-0 text-[#1e3e2b]">
        <Icon className="w-5 h-5" strokeWidth={2} />
      </div>
      <div className="min-w-0 space-y-0.5">
        <h4 className="text-sm font-bold text-[#1e3e2b] truncate">{title}</h4>
        <p className="text-xs text-gray-500 leading-snug line-clamp-2">{description}</p>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <ServicesBanner />

      <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">

        <h2 className="text-2xl sm:text-3xl font-black text-[#1e3e2b] text-center">
          Services Offered
        </h2>

        {/* Barangay Hall Services */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-black text-[#1e3e2b]">
            Barangay Hall Services
          </h3>
          <div className="grid grid-cols-2  gap-4">
            {barangayHallServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>

        {/* Health Center Services */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-black text-[#1e3e2b]">
            Health Center Services
          </h3>
          <div className="grid grid-cols-2  gap-4">
            {healthCenterServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}