import { useNavigate } from "react-router-dom";

export default function PrivacyAndTerms({
  type,
}: {
  type: "privacy" | "terms";
}) {
  const isPrivacy = type === "privacy";

  const navigate = useNavigate();

  function GoBack(delta: number) {
    navigate(delta);
  }

  return (
    <main className="bg-slate-50 min-h-screen pb-20 pt-10 animate-[fadeIn_0.5s_ease-out]">
      <section className="max-w-6xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
          </h1>
          <p className="text-slate-600 text-lg">
            {isPrivacy
              ? "Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use our services."
              : "Please read these terms and conditions carefully before using our website or services. They govern your access and use of our platform."}
          </p>
        </div>

        {/* Section Template */}
        <div className="space-y-12">
          {/* 1. Introduction */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              1. Introduction
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {isPrivacy
                ? "We are committed to protecting your personal information and maintaining transparency about how we use it. This Privacy Policy applies to all users of our website and services."
                : "By accessing or using our services, you agree to comply with these Terms & Conditions. If you do not agree, please do not use our website or services."}
            </p>
          </div>

          {/* 2. Information We Collect / Use of Services */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              2. {isPrivacy ? "Information We Collect" : "Use of Services"}
            </h2>
            {isPrivacy ? (
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>
                  Information you provide directly (name, email, phone, address)
                </li>
                <li>Account information, preferences, and settings</li>
                <li>Payment and transaction information</li>
                <li>
                  Automatically collected information such as IP address,
                  browser type, device information, and usage data
                </li>
                <li>Information from cookies and third-party tracking tools</li>
                <li>Customer service inquiries and communications</li>
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>
                  You may use our services only for lawful purposes and in
                  accordance with applicable laws.
                </li>
                <li>
                  Unauthorized use of accounts, systems, or content is strictly
                  prohibited.
                </li>
                <li>
                  You agree not to engage in activities that could disrupt or
                  interfere with our website or services.
                </li>
                <li>
                  Content you submit must not infringe on intellectual property
                  rights of others.
                </li>
                <li>
                  We may suspend or terminate access for violations of these
                  terms.
                </li>
              </ul>
            )}
          </div>

          {/* 3. How We Use Your Information / User Obligations */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              3.{" "}
              {isPrivacy ? "How We Use Your Information" : "User Obligations"}
            </h2>
            {isPrivacy ? (
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>To provide, maintain, and improve our services</li>
                <li>To process transactions and deliver products/services</li>
                <li>
                  To communicate updates, promotions, or important notices
                </li>
                <li>
                  To ensure security and prevent fraud or unauthorized
                  activities
                </li>
                <li>To comply with legal obligations and enforce agreements</li>
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Maintain the confidentiality of account credentials</li>
                <li>
                  Provide accurate and up-to-date information when using
                  services
                </li>
                <li>Comply with all applicable laws and regulations</li>
                <li>
                  Refrain from posting harmful, offensive, or unlawful content
                </li>
                <li>
                  Respect intellectual property rights of the company and others
                </li>
              </ul>
            )}
          </div>

          {/* 4. Sharing Information / Third-Party Services */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              4.{" "}
              {isPrivacy ? "Sharing Your Information" : "Third-Party Services"}
            </h2>
            {isPrivacy ? (
              <p className="text-slate-700 leading-relaxed">
                We do not sell your personal information. We may share your
                information with trusted third parties to provide services,
                process payments, deliver products, or comply with legal
                obligations. All third parties are required to maintain the
                confidentiality and security of your information.
              </p>
            ) : (
              <p className="text-slate-700 leading-relaxed">
                Our platform may integrate with third-party services for
                payments, shipping, or analytics. By using our services, you
                agree to their terms and acknowledge that we are not responsible
                for their practices.
              </p>
            )}
          </div>

          {/* 5. Cookies & Tracking / Limitations of Liability */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              5. {isPrivacy ? "Cookies & Tracking" : "Limitation of Liability"}
            </h2>
            {isPrivacy ? (
              <p className="text-slate-700 leading-relaxed">
                We use cookies and similar technologies to enhance your
                experience. You can control cookies through your browser
                settings. Cookies may help us remember preferences, analyze
                traffic, and deliver personalized content. Refusing cookies may
                limit certain features of our website.
              </p>
            ) : (
              <p className="text-slate-700 leading-relaxed">
                To the maximum extent permitted by law, we are not liable for
                any direct, indirect, incidental, or consequential damages
                arising from your use of our website or services. You
                acknowledge and agree that use of our platform is at your own
                risk.
              </p>
            )}
          </div>

          {/* 6. Data Retention / Termination */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              6. {isPrivacy ? "Data Retention" : "Termination"}
            </h2>
            {isPrivacy ? (
              <p className="text-slate-700 leading-relaxed">
                We retain personal information only as long as necessary to
                provide services, comply with legal obligations, or resolve
                disputes. When data is no longer required, we securely delete or
                anonymize it.
              </p>
            ) : (
              <p className="text-slate-700 leading-relaxed">
                We reserve the right to suspend or terminate accounts and access
                to services for violations of these terms or for any reason in
                our discretion.
              </p>
            )}
          </div>

          {/* 7. Your Rights / Governing Law */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              7. {isPrivacy ? "Your Rights" : "Governing Law"}
            </h2>
            {isPrivacy ? (
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Right to access your personal information</li>
                <li>Right to request correction or deletion of data</li>
                <li>Right to restrict or object to processing</li>
                <li>Right to withdraw consent where applicable</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>
            ) : (
              <p className="text-slate-700 leading-relaxed">
                These terms are governed by the laws of [Your Country/State].
                Any disputes shall be resolved in the appropriate courts in
                accordance with applicable law.
              </p>
            )}
          </div>

          {/* 8. Changes to Policy / Terms */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              8. {isPrivacy ? "Changes to This Policy" : "Changes to Terms"}
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {isPrivacy
                ? "We may update this Privacy Policy periodically. We encourage you to review it regularly. Significant changes will be highlighted or communicated directly."
                : "We may revise these Terms & Conditions at any time. Continued use of our services constitutes acceptance of the updated terms."}
            </p>
          </div>

          {/* 9. Contact Information */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">9. Contact</h2>
            <p className="text-slate-700 leading-relaxed">
              {isPrivacy
                ? "If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at [your email address]."
                : "If you have any questions about these Terms & Conditions, please contact us at [your email address]."}
            </p>
          </div>
        </div>

        {/* Back Home Button */}
        <div className="mt-12">
          <button
            onClick={() => GoBack(-1)}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-emerald-500 hover:shadow-lg transition-all duration-300"
          >
            ← Back
          </button>
        </div>
      </section>
    </main>
  );
}
