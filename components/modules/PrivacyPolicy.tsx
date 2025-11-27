import React from 'react';

function PrivacyPolicy() {
    return (
        <div className='main-padding relative w-full h-full bg-[#fff] flex flex-col items-center md:pt-[180px] pt-[140px] py-[30px] overflow-hidden font-manrope text-[#333]'>
            <div className="w-full max-w-[1000px] px-0">
                <h1 className='text-center lg:text-3xl text-[24px] font-extrabold lg:mb-8 mb-4'>PRIVACY POLICY — LMS DOMAIN</h1>

                {/* Introduction Section */}
                <div className="content-section py-[20px] border-b border-gray-200">
                    <div className="flex gap-1 text-[16px] mb-4">
                        <span className='font-bold'>Last Updated:</span>
                        <span className='font-normal'>28/11/2025</span>
                    </div>
                    <div className="space-y-4 text-[16px] leading-relaxed">
                        <p>LMS Domain respects your privacy and is committed to safeguarding it. Along with our Terms of Service, this Privacy Policy (“<span className="font-bold">Policy</span>”) explains what information we collect when you use our AI-powered Learning Management System, how and why we collect it, how it is used, shared, and stored, and the rights you have over the data you provide.</p>
                        <p>For clarity, references to “LMS Domain”, “we”, “us”, or “our” refer to Techiegram, the legal entity that operates the LMS Domain platform and its AI-powered services. References to “you”, “your”, or “User(s)” include all visitors, institutions, administrators, instructors, students, and any other individuals accessing the Platform.</p>
                        <p>The Services are governed by this Policy, the Terms of Service, and any other guidelines applicable to you (“Platform Terms”). By using the Platform, including its AI-driven learning and productivity features, you consent to the collection, use, sharing, and storage of your data as described in this Policy. If you do not agree, you should cease using the Platform.</p>
                        <p>If you have previously provided data and wish to modify or delete it, you may do so in accordance with the “Your Rights” and “Your Choices” sections.</p>
                        <p>Certain AI functionalities in the Platform rely on third-party providers, including OpenAI’s API, strictly for processing prompts and generating AI responses. LMS Domain does not use these AI services to train external AI models.</p>
                        <p>If any information you upload violates our Platform Terms, we may remove such information and limit your access.</p>
                    </div>
                </div>

                {/* 1. What Information We Collect */}
                <div className="content-section py-6">
                    <h2 className="text-xl font-bold mb-4">1. What Information We Collect</h2>
                    <p className="mb-4">We collect information to operate, secure, improve, and personalize our AI-powered LMS Platform. This includes data required for AI-based features like content generation, recommendations, auto-summaries, and automated learning assistance.</p>

                    <h3 className="text-lg font-bold mt-4 mb-2">1.1 Personal Data You Provide Directly</h3>
                    <p className="mb-2">These are details you provide intentionally when creating or using your account or interacting with AI-powered features:</p>

                    <div className="pl-4 mb-4">
                        <h4 className="font-semibold mt-2">Account & Identity Information</h4>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Encrypted password</li>
                            <li>Role (Student, Instructor, Admin, Staff)</li>
                            <li>Institution or organization affiliation</li>
                        </ul>

                        <h4 className="font-semibold mt-2">AI Interaction Data <span className="text-sm font-normal text-gray-500">(Added due to AI functionality)</span></h4>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>Prompts entered into AI tools</li>
                            <li>AI-generated summaries, insights, or recommendations</li>
                            <li>Query logs used strictly for service functionality (not model training)</li>
                        </ul>
                        <p className="text-sm italic text-gray-600 mb-3">This data ensures the functioning of AI tools such as lesson summarization, AI chat assistants, course drafting tools, etc.</p>

                        <h4 className="font-semibold mt-2">Learning & Course Data</h4>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>Course enrollments, progress tracking, assignments, submissions, quizzes</li>
                            <li>Grades, assessment results, and certificates</li>
                            <li>Uploaded files (documents, videos, images)</li>
                            <li>Interaction logs (comments, messages, forum posts)</li>
                        </ul>

                        <h4 className="font-semibold mt-2">Institution Account Data</h4>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>Institution name, details, branding, and domain/subdomain configuration</li>
                            <li>AI tool usage settings for the institution</li>
                            <li>User lists and permission roles</li>
                        </ul>

                        <h4 className="font-semibold mt-2">Support, Communication & Feedback</h4>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>Emails, messages, screenshots, or logs</li>
                            <li>Feedback and survey responses</li>
                        </ul>
                    </div>

                    <h3 className="text-lg font-bold mt-6 mb-2">1.2 Automatically Collected Data</h3>
                    <p className="mb-2">Automatically collected to ensure performance, security, and improvement of AI-based features:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li><strong>Technical Data:</strong> IP address, Browser/OS details, Device info, Language, Timezone, Login tokens.</li>
                        <li><strong>Usage & Activity Data:</strong> Pages visited, AI features accessed, Clickstream data, Navigation patterns, Error logs.</li>
                        <li><strong>Cookies & Local Storage:</strong> Authentication cookies, Security cookies, Preference cookies, Optional analytics cookies.</li>
                    </ul>
                    <p className="text-sm font-semibold">We do not use advertising, behavioral tracking, or retargeting cookies.</p>

                    <h3 className="text-lg font-bold mt-6 mb-2">1.3 Payment & Billing Information</h3>
                    <p className="mb-2">Handled exclusively by third-party PCI-DSS compliant providers (Stripe, Razorpay, PayPal).</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li><strong>We never store:</strong> Full card numbers, CVV, Expiry dates.</li>
                        <li><strong>We may store:</strong> Billing details, Transaction IDs, Subscription plan details, Payment status, Invoices.</li>
                    </ul>
                </div>

                {/* 2. How We Use Your Information */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4">We use personal data strictly for business-legitimate purposes, including the operation of AI-powered learning tools:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>To Provide and Operate the Service:</strong> Managing accounts, delivering lessons, generating AI-based summaries/explanations, supporting AI assistant tools, and operating institution-specific LMS spaces.</li>
                        <li><strong>For Security and Compliance:</strong> Authenticating logins, preventing fraud, enforcing rules, maintaining audit logs, and using AI-based anomaly detection for security.</li>
                        <li><strong>For Customer Support:</strong> Responding to requests, troubleshooting, and reviewing logs/AI history when necessary for diagnosis.</li>
                        <li><strong>For Platform Improvement:</strong> Analyzing engagement patterns and AI accuracy (never using your data to train external models).</li>
                        <li><strong>For Payments:</strong> Billing and subscription management.</li>
                        <li><strong>For Legal Reasons:</strong> Complying with obligations and handling disputes.</li>
                    </ul>
                </div>

                {/* 3. Legal Bases for Processing */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">3. Legal Bases for Processing (GDPR)</h2>
                    <p className="mb-2">For EU users:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Contractual necessity:</strong> Provides core and AI-powered services.</li>
                        <li><strong>Legitimate interests:</strong> Security, fraud prevention, usability improvements, AI enhancement.</li>
                        <li><strong>Consent:</strong> Required for optional cookies, analytics, marketing, and specific AI features.</li>
                        <li><strong>Legal obligations:</strong> Tax laws, compliance requests.</li>
                    </ul>
                </div>

                {/* 4. Architecture & Data Roles */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">4. Architecture & Data Roles</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Institutions are Data Controllers:</strong> They decide what student data is collected, access permissions, retention rules, and how AI tools are enabled.</li>
                        <li><strong>LMS Domain is a Data Processor:</strong> We process data only as instructed.</li>
                        <li><strong>Limited Access:</strong> We access tenant data only for support, security, maintenance, and AI troubleshooting. We do not view content unless needed for these purposes.</li>
                    </ul>
                </div>

                {/* 5. Cookies */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">5. Cookies and Tracking Technologies</h2>
                    <p className="mb-2">AI tools may rely on functional cookies for personalization. We use:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Essential cookies:</strong> Required for login security, CSRF, load balancing.</li>
                        <li><strong>Functional cookies:</strong> Language, UI, AI preference settings.</li>
                        <li><strong>Optional analytics cookies:</strong> Used only with consent.</li>
                    </ul>
                    <p className="mt-2 font-semibold">No advertising or behavioral tracking.</p>
                </div>

                {/* 6. Sharing of Data */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">6. Sharing of Data</h2>
                    <p className="mb-4">We do not sell personal data. We share data only with:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Infrastructure Providers:</strong> AWS, Cloudflare.</li>
                        <li><strong>Email Providers:</strong> SES, Mailgun, SendGrid.</li>
                        <li><strong>Payment Providers:</strong> Stripe, Razorpay, PayPal.</li>
                        <li><strong>AI & API Providers:</strong> OpenAI API and internal AI services (strictly for feature functionality; OpenAI does not train its models on your data).</li>
                        <li><strong>Legal Authorities:</strong> Only when legally required.</li>
                    </ul>
                </div>

                {/* 7. International Transfers */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">7. International Transfers</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>EU (GDPR):</strong> SCCs and approved mechanisms.</li>
                        <li><strong>India (DPDP Act):</strong> Allowed except restricted jurisdictions.</li>
                        <li><strong>US & Others:</strong> Standard industry practices.</li>
                    </ul>
                </div>

                {/* 8. Data Retention */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">8. Data Retention</h2>
                    <p className="mb-2">We retain data only as needed for service delivery, legal compliance, and security.</p>
                    <p>Upon account termination: Data is deleted, backups auto-expire, and logs may remain briefly for security purposes.</p>
                </div>

                {/* 9. Your Rights */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">9. Your Rights (GDPR • CCPA • DPDP)</h2>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li><strong>EU (GDPR):</strong> Access, correction, deletion, portability, objection, withdraw consent.</li>
                        <li><strong>California (CCPA/CPRA):</strong> Know, delete, correct data; opt-out rights.</li>
                        <li><strong>India (DPDP Act):</strong> Access, correction, deletion, grievance rights.</li>
                    </ul>
                    <p><strong>Requests:</strong> Contact us at <a href="mailto:support@lmsdomain.com" className="text-blue-600 underline">support@lmsdomain.com</a>. Verification may be required.</p>
                </div>

                {/* 10. Children's Data */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">10. Children’s Data</h2>
                    <p>Under 13 cannot register independently. Institutions must comply with local laws. Unauthorized minors’ data will be removed.</p>
                </div>

                {/* 11. Custom Domains */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">11. Custom Domains</h2>
                    <p>We may process DNS, SSL, and verification settings used only to operate the institution’s LMS site.</p>
                </div>

                {/* 12. Security Measures */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">12. Security Measures</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Technical:</strong> AES-256, TLS 1.2+, firewalls, RBAC, secure APIs.</li>
                        <li><strong>Administrative:</strong> NDA agreements, staff training, incident response.</li>
                        <li><strong>Physical:</strong> Secure AWS data centers.</li>
                    </ul>
                </div>

                {/* 13. Data Breach Notification */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">13. Data Breach Notification</h2>
                    <p>We notify affected institutions immediately with impact details, mitigation measures, and recommended actions.</p>
                </div>

                {/* 14. Changes to This Privacy Policy */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">14. Changes to This Privacy Policy</h2>
                    <p>Updates may occur due to law changes, AI enhancements, or feature updates. Users will be informed of significant updates.</p>
                </div>

                {/* 15. Contact Information */}
                <div className="content-section py-6 border-t border-gray-100 bg-gray-50 p-4 rounded-lg mt-4">
                    <h2 className="text-xl font-bold mb-4">15. Contact Information</h2>
                    <p className="font-semibold">LMS Domain (Techiegram)</p>
                    <p>Email: <a href="mailto:support@lmsdomain.com" className="text-blue-600 underline">support@lmsdomain.com</a></p>
                    <p>Website: <a href="https://lmsdomain.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://lmsdomain.com</a></p>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy;