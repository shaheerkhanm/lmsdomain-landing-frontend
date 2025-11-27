import React from 'react';

function TermsAndConditions() {
    return (
        <div className='main-padding relative w-full h-full bg-[#fff] flex flex-col items-center md:pt-[180px] pt-[140px] py-[30px] overflow-hidden font-manrope text-[#333]'>
            <div className="terms-conditions w-full max-w-[1000px]">
                <h1 className='text-center lg:text-3xl text-[24px] font-extrabold lg:mb-8 mb-4'>TERMS & CONDITIONS — LMS DOMAIN</h1>

                {/* Introduction Section */}
                <div className="content-section py-[20px] border-b border-gray-200">
                    <div className="flex gap-1 text-[16px] mb-4">
                        <span className='font-bold'>Last Updated:</span>
                        <span className='font-normal'>28/11/2025</span>
                    </div>
                    <div className="space-y-4 text-[16px] leading-relaxed">
                        <p>These Terms & Conditions (“<span className="font-bold">Terms</span>”) govern your access to and use of the LMS Domain platform, operated by Techiegram, along with any applications, websites, AI-powered learning tools, or services provided under the LMS Domain brand (collectively, the “<span className="font-bold">Platform</span>” or the “<span className="font-bold">Service</span>”).</p>
                        <p>By accessing or using LMS Domain, you agree to be bound by these Terms and all policies referenced here, including our Privacy Policy and Data Processing Agreement. If you do not agree with any part of these Terms, you must stop using the Platform immediately.</p>
                        <p>For clarity, references to “LMS Domain”, “we”, “us” or “our” mean Techiegram and its affiliates. References to “you”, “your” or “User(s)” refer to visitors, students, instructors, administrators, institutions, or any other individual accessing or interacting with the Platform.</p>
                        <p>These Terms apply to all users of the Platform, including institution-managed accounts. Additional terms may apply depending on your subscription plan, integrations, or institutional setup.</p>
                    </div>
                </div>

                {/* 1. About LMS Domain */}
                <div className="content-section py-6">
                    <h2 className="text-xl font-bold mb-4">1. About LMS Domain</h2>
                    <p className="mb-4">LMS Domain is an AI-powered learning management system that enables institutions, educators, and organizations to create, manage, deliver, and track educational content. The Platform may include features such as:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Course creation tools</li>
                        <li>AI-assisted content generation, summaries, and learning recommendations</li>
                        <li>Custom domains and branded portals</li>
                        <li>User, role, and permission management</li>
                        <li>Assessments, assignments, and progress tracking</li>
                        <li>Analytics dashboards, Communication tools, and Third-party integrations</li>
                    </ul>
                    <p className="text-sm italic text-gray-600">Certain AI features may rely on external APIs—including OpenAI—to process prompts and generate results. These APIs are used strictly to provide requested functionality.</p>
                </div>

                {/* 2. Eligibility */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">2. Eligibility & Account Requirements</h2>
                    <p className="mb-2">You must be at least 18 years old to create an individual account on LMS Domain. Minors may use the Platform only through institution-managed accounts, under appropriate supervision and in compliance with local laws.</p>
                    <p className="mb-2 font-semibold">You are responsible for:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Maintaining accurate account information</li>
                        <li>Safeguarding your login credentials</li>
                        <li>Ensuring your use complies with these Terms and applicable laws</li>
                    </ul>
                    <p>Institutions are responsible for managing their users, roles, permissions, domain settings, and compliance within their tenant environment. We may suspend or terminate accounts that violate these Terms.</p>
                </div>

                {/* 3. Use of the Platform */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">3. Use of the Platform</h2>
                    <p className="mb-2">You agree to use LMS Domain only for lawful, educational, and authorized purposes. You must not:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Access accounts or data you are not authorized to access</li>
                        <li>Attempt to bypass security or technical protections</li>
                        <li>Upload harmful, malicious, or illegal content</li>
                        <li>Interfere with the integrity or performance of the Platform</li>
                        <li>Use AI tools for abusive, harmful, or unethical purposes</li>
                        <li>Exploit the Platform for unauthorized commercial uses</li>
                    </ul>
                    <p className="mt-4">We reserve the right to remove content that violates these Terms.</p>
                </div>

                {/* 4. AI-Powered Features */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">4. AI-Powered Features</h2>
                    <p className="mb-2">LMS Domain includes AI functionality, such as AI chat assistants, automated lesson summaries, content generation suggestions, course drafting recommendations, and personalized study assistance.</p>
                    <p className="mb-2 font-semibold">You understand and agree that:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>AI responses may not always be accurate</li>
                        <li>AI must not be used to produce harmful, abusive, misleading, or illegal content</li>
                        <li>AI features rely on third-party APIs (e.g., OpenAI) to process your prompts</li>
                        <li>Your prompts may be transmitted to these APIs securely for processing</li>
                        <li>We do not train external AI models on your data</li>
                    </ul>
                    <p>Institutions may enable/disable AI features for their users.</p>
                </div>

                {/* 5. Institutional Accounts */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">5. Institutional Accounts</h2>
                    <p className="mb-2">Institutions using LMS Domain receive their own isolated workspace (tenant). Institutions control:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Data entered by their users</li>
                        <li>Roles and permissions</li>
                        <li>Course structure</li>
                        <li>Domain branding and configuration</li>
                        <li>LMS Domain AI settings and User access</li>
                    </ul>
                    <p>LMS Domain acts as a data processor for institution-managed data. Institutions are responsible for ensuring lawful use of learner data.</p>
                </div>

                {/* 6. Subscriptions */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">6. Subscriptions, Pricing & Payments</h2>
                    <p className="mb-4">Access to the Platform requires a valid subscription unless otherwise stated.</p>

                    <h3 className="text-lg font-bold mt-4 mb-2">6.1 Billing</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Subscription fees are billed according to your selected plan.</li>
                        <li>Payments are processed via Stripe, Razorpay, PayPal, or other authorized providers.</li>
                        <li>Fees may vary based on selected features or institution size.</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-4 mb-2">6.2 Renewals & Refunds</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Subscriptions auto-renew unless cancelled before the renewal date.</li>
                        <li>Refunds are issued only as specified in your plan terms or required by law.</li>
                        <li>Custom enterprise contracts may include separate billing terms.</li>
                    </ul>
                </div>

                {/* 7. Content Ownership */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">7. Content Ownership & Licensing</h2>

                    <h3 className="text-lg font-bold mt-4 mb-2">7.1 User-Generated Content</h3>
                    <p className="mb-2">You retain ownership of Course materials, Assignments, Branding assets, and Institution content.</p>
                    <p className="mb-3">You grant LMS Domain a limited license to store, process, and display your content solely to operate the Service.</p>

                    <h3 className="text-lg font-bold mt-4 mb-2">7.2 LMS Domain Content</h3>
                    <p className="mb-2">All Platform components, including Software, AI models, UI/UX design, Documentation, and Branding are owned by LMS Domain and protected by applicable intellectual property laws.</p>
                    <p>You may not copy, modify, reverse-engineer, or redistribute any part of the Platform without authorization.</p>
                </div>

                {/* 8. Custom Domains */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">8. Custom Domains</h2>
                    <p className="mb-2">Institutions may configure custom domains to host their LMS. To support this, we process:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>DNS records</li>
                        <li>SSL certificates</li>
                        <li>Domain verification details</li>
                    </ul>
                    <p className="mt-2">We use this information solely to deliver the institution’s branded LMS environment.</p>
                </div>

                {/* 9. Termination */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">9. Termination & Suspension</h2>
                    <p className="mb-2">We may suspend or terminate accounts if:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>You violate these Terms</li>
                        <li>Your subscription lapses</li>
                        <li>Your use threatens security or stability</li>
                        <li>Illegal or harmful activity is detected</li>
                    </ul>
                    <p>Upon termination, access to the Platform is revoked, content and data may be deleted per our Data Retention Policy, and backup copies are automatically purged over time.</p>
                </div>

                {/* 10. Privacy */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">10. Privacy & Data Protection</h2>
                    <p className="mb-2">Your use of the Platform is governed by our Privacy Policy and Data Processing Agreement, which explain:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>What information we collect</li>
                        <li>How we use and protect your data</li>
                        <li>AI-specific data processing</li>
                        <li>Rights under GDPR, CCPA/CPRA, and India’s DPDP Act</li>
                    </ul>
                    <p>By using the Platform, you consent to data processing as described in those documents.</p>
                </div>

                {/* 11. Security */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">11. Security</h2>
                    <p className="mb-2">We implement industry-standard security protections, including:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>AES-256 encryption at rest & TLS encryption in transit</li>
                        <li>Role-based access controls</li>
                        <li>Secure APIs</li>
                        <li>Monitoring and intrusion detection</li>
                        <li>Regular vulnerability assessments</li>
                    </ul>
                    <p>No system can be guaranteed 100% secure, but we take reasonable measures to protect your data.</p>
                </div>

                {/* 12. Third-Party Services */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">12. Third-Party Services</h2>
                    <p>The Platform may integrate with or rely on Email providers, Payment gateways, Cloud infrastructure, AI model providers, and Analytics tools. Your use of these features is subject to their respective terms and privacy practices.</p>
                </div>

                {/* 13 & 14 Disclaimers & Liability */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">13. Disclaimers & Limitations</h2>
                    <p className="mb-4">The Platform, including AI features, is provided “as is” without warranties of accuracy, completeness, or fitness for a particular purpose. AI suggestions should be reviewed by qualified educators or administrators.</p>
                    <p className="mb-4">We are not liable for loss of data, service interruptions, errors caused by user actions, or third-party service failures.</p>
                    <p>To the maximum extent permitted by law, LMS Domain’s liability is limited to the amount paid in the past 12 months of your subscription. We are not liable for indirect, incidental, or consequential damages.</p>
                </div>

                {/* 15. Changes */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">15. Changes to These Terms</h2>
                    <p className="mb-2">We may update these Terms to reflect legal requirements, feature changes, security needs, or business updates.</p>
                    <p>Significant changes will be communicated through the Platform or email. Continued use after updates constitutes acceptance.</p>
                </div>

                {/* 16. Governing Law */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">16. Governing Law</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>US users:</strong> Delaware state laws</li>
                        <li><strong>EU users:</strong> Applicable GDPR-aligned jurisdiction</li>
                        <li><strong>India users:</strong> Indian law, including DPDP Act</li>
                        <li><strong>Other regions:</strong> Local applicable laws</li>
                    </ul>
                </div>

                {/* 17. Contact Information */}
                <div className="content-section py-6 border-t border-gray-100 bg-gray-50 p-4 rounded-lg mt-4">
                    <h2 className="text-xl font-bold mb-4">17. Contact Information</h2>
                    <p className="mb-2">For questions, concerns, or account-related issues:</p>
                    <p className="font-semibold">LMS Domain (Techiegram)</p>
                    <p>Email: <a href="mailto:support@lmsdomain.com" className="text-blue-600 underline">support@lmsdomain.com</a></p>
                    <p>Website: <a href="https://lmsdomain.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://lmsdomain.com</a></p>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions;