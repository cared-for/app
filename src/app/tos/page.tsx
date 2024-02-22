import Header from "../header";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-[#e0f0e9]">
      <Header />
      <main className="max-w-4xl mx-auto mt-10 p-8">
        <h1 className="text-2xl font-bold text-center mb-4">CaredFor Terms of Service</h1>
        <section className="mb-5">
          <h2 className="text-xl font-semibold">Introduction</h2>
          <p>Welcome to CaredFor! This automated daily check-in system ("Service") is designed to provide a simple and reliable way to ensure the wellbeing of our users by making automated calls to the recipients' phones at specified times. By using our Service, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.</p>
        </section>
        <section className="mb-5">
          <h2 className="text-xl font-semibold">Service Description</h2>
          <p>CaredFor provides an automated daily check-in call service to the recipient's phone at a time specified by the user. If a check-in call is missed, the Service will attempt to call again in 15 minutes, repeating this process up to four times over the course of an hour. If all four calls are missed, CaredFor will notify the user's dependents via SMS of their absence.</p>
        </section>
        <section className="mb-5">
          <h2 className="text-xl font-semibold">Registration and User Information</h2>
          <ul className="list-disc pl-5">
            <li>To use CaredFor, you must register and provide certain information, including your email, full name, and phone number, as well as the full names, emails, and phone numbers of your dependents.</li>
            <li>You agree to provide accurate, current, and complete information about yourself and your dependents.</li>
            <li>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.</li>
            <li>You agree to accept responsibility for all activities that occur under your account or password.</li>
          </ul>
        </section>

        {/* Privacy Section */}
        <section className="mb-5">
          <h2 className="text-xl font-semibold">Privacy</h2>
          <p>Your privacy is important to us. The information you provide will be used solely for the purpose of delivering the Service and will not be shared with third parties, except as necessary to provide the Service or as required by law.</p>
          <p>For more information, please refer to our Privacy Policy.</p>
        </section>

        {/* Use of Service Section */}
        <section className="mb-5">
          <h2 className="text-xl font-semibold">Use of Service</h2>
          <ul className="list-disc pl-5">
            <li>The Service is intended for personal, non-commercial use.</li>
            <li>You agree not to misuse the Service or help anyone else to do so.</li>
          </ul>
        </section>

        {/* Notifications to Dependents Section */}
        <section className="mb-5">
          <h2 className="text-xl font-semibold">Notifications to Dependents</h2>
          <p>By providing the contact information of your dependents, you confirm that you have obtained their consent to be contacted by CaredFor in the event of your absence after missed check-ins.</p>
        </section>

        {/* Changes to Terms of Service Section */}
        <section className="mb-5">
          <h2 className="text-xl font-semibold">Changes to Terms of Service</h2>
          <p>We reserve the right to modify these Terms at any time. If we make changes that affect your use of the Service, we will notify you by email or through the Service.</p>
        </section>

        {/* Termination Section */}
        <section className="mb-5">
          <h2 className="text-xl font-semibold">Termination</h2>
          <ul className="list-disc pl-5">
            <li>You can terminate your use of the Service at any time by contacting us at caredforinfo@gmail.com.</li>
            <li>We may terminate or suspend your access to the Service at any time, without notice, for any reason, including for violation of these Terms.</li>
          </ul>
        </section>

        {/* Limitation of Liability Section */}
        <section className="mb-5">
          <h2 className="text-xl font-semibold">Limitation of Liability</h2>
          <p>CaredFor is not responsible for any damages or losses resulting from your use of the Service or your inability to use the Service.</p>
        </section>

        {/* Contact Information Section */}
        <section className="mb-5">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at caredforinfo@gmail.com.</p>
        </section>

        {/* Acknowledgment Section */}
        <section className="mb-5">
          <p>By using CaredFor, you acknowledge that you have read these Terms of Service, understand them, and agree to be bound by them.</p>
        </section>
      </main>
    </div>
  );
}

