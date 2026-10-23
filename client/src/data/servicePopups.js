// Popup content for each service card (matches the card titles in
// Services.jsx, HealthCenterServices.jsx and BarangayHallServices.jsx).
//
// Health Center services show "Where" and "When".
// Barangay Hall services show "Requirements" (or just a description).

const REQ_INTRO = 'Please be informed that the following should be present:';

const servicePopups = {
  /* ---------------- Health Center ---------------- */
  'Medical Consultation': {
    description:
      'Provides routine health check-ups and medical evaluations for common illnesses and minor health concerns. Patients receive diagnosis, medical advice, and initial prescription plans from duty health officers.',
    where: 'Barangay Health Center (Doctor / Nurse Desk)',
    when: 'Monday to Friday | 8:00 AM – 5:00 PM',
  },
  'Dengue Prevention': {
    description:
      'Offers community guidance and educational materials on preventing mosquito-borne diseases and maintaining clean surroundings. Residents can also report potential breeding sites or coordinate local misting and fogging requests.',
    where: 'Barangay Official Gym',
    when: 'Friday | 9:00 AM – 11:00 AM',
  },
  'Child Health': {
    description:
      'Focuses on tracking the growth, weight, and general physical development of infants and young children. Nutrition assessments and early healthcare interventions are conducted to support child wellness.',
    where: 'Barangay Health Center Child Care / Pediatrics Section',
    when: 'Tuesday & Thursday | 8:00 AM – 12:00 PM',
  },
  Immunization: {
    description:
      'Provides free essential vaccinations to infants, young children, and eligible community members. Routine immunization schedules help protect residents against preventable infectious diseases.',
    where: 'Barangay Health Center',
    when: 'Wednesday | 8:00 AM – 3:00 PM',
  },
  'Medicine Assistance': {
    description:
      'Distributes free basic, essential medicines and maintenance drugs based on local health center availability. Patients must present a valid prescription or undergo a consultation to receive supplies.',
    where: 'Barangay Health Center',
    when: 'Monday to Friday | 8:00 AM – 5:00 PM',
  },
  'Maternal Care': {
    description:
      'Delivers comprehensive prenatal check-ups, health monitoring, and nutritional advice for expectant mothers. Midwives and healthcare staff guide mothers through proper care up to post-natal recovery.',
    where: 'Barangay Health Center',
    when: 'Monday & Wednesday | 8:00 AM – 12:00 PM',
  },
  'Health Screening': {
    description:
      'Conducts basic vital sign monitoring including blood pressure checks, body temperature readings, and basic screening tests. It helps detect early warning signs of common conditions like hypertension or diabetes.',
    where: 'Barangay Health Center',
    when: 'Monday to Friday | 8:00 AM – 5:00 PM',
  },
  'Nutrition Services': {
    description:
      'Offers personalized dietary counseling and health monitoring tailored for malnourished children and pregnant women. Staff track weight progress and provide supplementary feeding guidance.',
    where: 'Barangay Health Center',
    when: 'Saturday | 7:00 AM – 10:00 AM',
  },
  'First Aid': {
    description:
      'Delivers immediate medical assistance for minor cuts, burns, wounds, and acute non-life-threatening emergencies. Trained staff stabilize patients and provide necessary dressings or basic emergency interventions.',
    where: 'Barangay Official Gym',
    when: 'Friday | 12:00 PM – 5:00 PM',
  },
  'Health Records': {
    description:
      'Manages local medical histories, immunization logs, and official health certifications required for work or school. Residents can request official health-related documents directly from the administrative desk.',
    where: 'Barangay Health Center',
    when: 'Monday to Friday | 8:00 AM – 5:00 PM',
  },
  'Health Education': {
    description:
      'Hosts regular community seminars and awareness campaigns on public sanitation, personal hygiene, and disease prevention. The sessions empower residents with knowledge for maintaining a healthy lifestyle.',
    where: 'Barangay Official Gym',
    when: 'Friday | 1:00 PM – 4:00 PM',
  },

  /* ---------------- Barangay Hall ---------------- */
  Complaints: {
    description:
      'Submit a complaint through our website, fill out the online form describing the issue, upload any evidence, and submit for review. You can also submit a complaint through our Barangay Hall.',
  },
  Summon: {
    heading: 'Summons',
    description:
      'Request an official notice for a respondent to appear, or present your received notice at the scheduled hearing date for mediation/investigation.',
    requirementsIntro: REQ_INTRO,
    requirements: [
      'Copy of the official Complaint/Summon notice',
      'Valid Government ID',
      'Relevant supporting evidence/documents',
    ],
  },
  Inquiries: {
    description:
      'Through our Barangay Hall approach the assistance desk or official in charge to ask your questions or check document processing status.',
    requirementsIntro: REQ_INTRO,
    requirements: [
      'Valid Government ID',
      'Any relevant reference code',
      'Receipt',
      'Prior document related to your inquiry (if applicable)',
    ],
  },
  Certification: {
    description:
      'Submit an application specifying the purpose (e.g., employment, business), pay the required fee, and await issuance.',
    requirementsIntro: REQ_INTRO,
    requirements: [
      'Valid Government ID',
      'Recent 2×2 photo',
      'Cedula (Community Tax Certificate)',
      'Proof of residence',
    ],
  },
  'Certificate of Residency': {
    heading: 'Certification of Residence',
    description:
      'Fill out an application form in our Barangay Hall verifying your address, pay the processing fee, and pick up the stamped certificate.',
    requirementsIntro: REQ_INTRO,
    requirements: [
      'Valid Government ID showing current address',
      'Proof of address (utility bill, lease contract, or voter ID)',
      'Cedula (Community Tax Certificate)',
    ],
  },
  Cedula: {
    description:
      'Fill out the CTC information slip in our Barangay Hall, declare income (if applicable), pay the tax fee based on gross earnings, and receive your receipt/Cedula.',
    requirementsIntro: REQ_INTRO,
    requirements: [
      'Valid ID',
      'Proof of Income/Payslip or ITR (for employed/business owners)',
    ],
  },
  'Official Receipts': {
    heading: 'Official Receipt',
    description:
      'Pay the required fee at the Barangay Treasurer cash counter after service approval to claim your official payment proof.',
    requirementsIntro: REQ_INTRO,
    requirements: [
      'Order of Payment slip/assessment slip issued by the processing officer',
      'Cash payment',
    ],
  },
};

export default servicePopups;