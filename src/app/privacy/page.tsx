import Header from "../header"

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-[#e0f0e9]">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-4">Privacy Policy for CaredFor</h1>
        <p className="text-sm text-gray-600 text-center">Effective Date: February 1, 2024</p>
        
        <section className="mt-8">
          <p>Welcome to CaredFor, a dedicated web application designed to provide peace of mind through our automated daily check-in system. This Privacy Policy is intended to inform you about how we collect, use, and share your personal information, as well as the personal information of your dependents, through your use of our services.</p>
        </section>
        
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Information Collection</h2>
          <p>When you use CaredFor, we collect the following types of information:</p>
          <ul className="list-disc pl-5">
            <li><strong>Personal Information:</strong> This includes your full name, email address, and phone number, which you provide when creating an account or utilizing our services.</li>
            <li><strong>Dependent Information:</strong> We also collect the full names, email addresses, and phone numbers of your dependents, as provided by you, to ensure our check-in system operates effectively.</li>
            <li><strong>Usage Information:</strong> Information on how you interact with our services may be collected to help improve and customize your experience.</li>
          </ul>
        </section>
        
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Use of Information</h2>
          <p>The information we collect is used in the following ways:</p>
          <ul className="list-disc pl-5">
            <li>To Provide Services: To conduct daily check-ins, make subsequent calls if a check-in is missed, and notify dependents when necessary.</li>
            <li>To Improve Our Services: We analyze usage information to enhance our web application's functionality and user experience.</li>
            <li>For Communication: To send you important updates about our services, as well as responses to your inquiries.</li>
          </ul>
        </section>
        
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Sharing of Information</h2>
          <p>We do not sell your personal information. Information may be shared in the following circumstances:</p>
          <ul className="list-disc pl-5">
            <li>With Dependents: As part of our service, your dependents will be notified via SMS if a check-in call is missed.</li>
            <li>With Service Providers: We may share your information with third-party service providers who perform services on our behalf, such as SMS delivery services, under strict confidentiality agreements.</li>
            <li>Legal Obligations: If required by law, we may disclose your information in response to a subpoena, court order, or other governmental request.</li>
          </ul>
        </section>
        
        <section className="mt-8">
          <h2 className="text-xl font-semibold">User Rights</h2>
          <p>You have the right to access, correct, or delete your personal information and your dependents' information at any time.</p>
        </section>
        
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Data Security</h2>
          <p>We take the security of your personal information seriously and implement reasonable electronic, physical, and administrative safeguards to help protect it from unauthorized access, use, or disclosure. Despite our efforts, no security measures are completely impenetrable, and we cannot guarantee the security of your personal information.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes in our practices or service offerings. The effective date at the top of this policy will be updated to reflect the date of the most current version. We encourage you to review this Privacy Policy regularly to stay informed about how we are protecting the personal information we collect. Your continued use of our services after any changes to this Privacy Policy will constitute your acceptance of such changes.</p>
        </section>
        
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or our practices, please contact us at caredforinfo@gmail.com.</p>
        </section>
      </div>
    </div>
  );
};
