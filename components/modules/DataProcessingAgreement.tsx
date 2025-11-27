import React from 'react';

function DataProcessingAgreement() {
    return (
        <div className='main-padding relative w-full h-full bg-[#fff] flex flex-col items-center md:pt-[180px] pt-[140px] py-[30px] overflow-hidden font-manrope text-[#333]'>
            <div className="dpa-policy w-full max-w-[1000px]">
                {/* Specific H1 styling requested */}
                <h1 className='text-center lg:text-3xl text-[24px] font-extrabold lg:mb-8 mb-4'>DATA PROCESSING AGREEMENT (DPA) – LMS DOMAIN</h1>

                {/* Introduction Section */}
                <div className="content-section py-[20px] border-b border-gray-200">
                    <div className="flex gap-1 text-[16px] mb-4">
                        <span className='font-bold'>Last Updated:</span>
                        <span className='font-normal'>28/11/2025</span>
                    </div>
                    <div className="space-y-4 text-[16px] leading-relaxed">
                        <p>This Data Processing Agreement (“<span className="font-bold">DPA</span>”) forms part of the Terms of Service and governs how Techiegram, operating under the name LMS Domain (“LMS Domain”, “we”, “us”, “our”), processes personal data on behalf of you or your institution (“Controller”, “you”, “your”) when using our AI-powered Learning Management System (“Platform”, “Service”).</p>
                        <p>This DPA explains what data we process, why we process it, how we secure it, and the commitments we make in relation to data privacy and protection. It applies whenever we act as a Processor handling personal data on your behalf.</p>
                    </div>
                </div>

                {/* 1. Roles and Responsibilities */}
                <div className="content-section py-6">
                    <h2 className="text-xl font-bold mb-4">1. Roles and Responsibilities</h2>

                    <h3 className="text-lg font-bold mt-4 mb-2">1.1 Controller</h3>
                    <p className="mb-2">You, the institution or individual using LMS Domain, determine:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>What personal data is collected</li>
                        <li>How long the data is kept</li>
                        <li>Which users have access</li>
                        <li>The purposes for which the data is processed</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-4 mb-2">1.2 Processor</h3>
                    <p className="mb-2">LMS Domain will:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Process personal data only on your documented instructions</li>
                        <li>Provide the technical and operational infrastructure to support secure processing</li>
                        <li>Not use your data for advertising or external analytics</li>
                        <li>Not train external AI models using your data</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-4 mb-2">1.3 Sub-Processors</h3>
                    <p className="mb-2">To operate our platform reliably and securely, we use carefully selected sub-processors including:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li><strong>Infrastructure:</strong> AWS, Cloudflare</li>
                        <li><strong>Email Delivery:</strong> Amazon SES, SendGrid, Mailgun</li>
                        <li><strong>Payments:</strong> Stripe, Razorpay, PayPal</li>
                        <li><strong>AI API Providers:</strong> OpenAI API (used only for AI-based functionality such as chat assistance, summaries, and content generation)</li>
                        <li><strong>Other operational services:</strong> logging, error monitoring, backup services</li>
                    </ul>
                    <p className="text-sm italic text-gray-600">We remain responsible for ensuring these sub-processors meet comparable data protection and security standards.</p>
                </div>

                {/* 2. Types of Data We Process */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">2. Types of Data We Process</h2>
                    <p className="mb-4">LMS Domain processes the following data categories strictly for the purpose of providing the Platform:</p>

                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>2.1 Account and Identity Data:</strong> Name, email, phone number (optional), encrypted passwords, roles, institution affiliation.</li>
                        <li><strong>2.2 Learning-Related Data:</strong> Enrollments, assignments, evaluations, submissions, grades, certificates, progress logs, uploaded media, communication logs.</li>
                        <li><strong>2.3 AI Interaction Data:</strong> Prompts submitted to AI tools, responses generated, metadata needed to operate AI features. (Note: Data sent to OpenAI via API is not used to train OpenAI models.)</li>
                        <li><strong>2.4 Technical and Log Data:</strong> IP addresses, device/browser information, login timestamps, usage logs, API activity logs, error reports.</li>
                        <li><strong>2.5 Billing and Transaction Data:</strong> Subscription details, payment confirmations, transaction IDs, invoices. (Processed by third-party payment gateways, not stored by us.)</li>
                    </ul>
                </div>

                {/* 3. Purpose and Scope of Processing */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">3. Purpose and Scope of Processing</h2>
                    <p className="mb-2">We process personal data solely to provide, operate, and improve the LMS Domain Platform, including:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>User account creation and authentication</li>
                        <li>Delivery of learning content, AI-powered assistance, assessments and digital classrooms</li>
                        <li>Institution configuration and multi-tenant management</li>
                        <li>Security monitoring and fraud detection</li>
                        <li>Customer support</li>
                        <li>Generating anonymized or aggregated insights</li>
                        <li>Ensuring performance, backups and disaster recovery</li>
                    </ul>
                    <p className="mb-2 font-semibold">We do not:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Sell personal data</li>
                        <li>Use it for advertising</li>
                        <li>Mine it for marketing</li>
                        <li>Share it with third parties unrelated to service delivery</li>
                    </ul>
                </div>

                {/* 4. Instructions & Compliance */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">4. Instructions & Compliance</h2>
                    <p className="mb-2">LMS Domain will process data only:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>As described in this DPA</li>
                        <li>As instructed by the Controller</li>
                        <li>As required by law</li>
                    </ul>
                    <p>Where legally permitted, we will notify you before processing your data for any new purpose not covered in this DPA.</p>
                </div>

                {/* 5. Security Measures */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">5. Security Measures</h2>
                    <p className="mb-4">We implement industry-standard administrative, technical, and physical safeguards including:</p>

                    <h3 className="text-lg font-bold mt-4 mb-2">Technical Safeguards</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>AES-256 encryption at rest & TLS 1.2+ encrypted connections</li>
                        <li>Role-based access control (RBAC)</li>
                        <li>Secure API authentication and tokens</li>
                        <li>Network firewalls and IDS/IPS</li>
                        <li>Multi-layer access restrictions</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-4 mb-2">Administrative Safeguards</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Staff confidentiality agreements</li>
                        <li>Access limited to essential personnel</li>
                        <li>Regular security and compliance training</li>
                        <li>Audit logging and monitoring</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-4 mb-2">Physical Safeguards</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Secure AWS data centers</li>
                        <li>Redundant storage</li>
                        <li>Disaster recovery protocols</li>
                    </ul>
                </div>

                {/* 6. Data Retention and Deletion */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">6. Data Retention and Deletion</h2>
                    <p className="mb-2">We retain data only for:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>The duration of the institution’s or user’s active subscription</li>
                        <li>A reasonable post-termination period for backups</li>
                        <li>Legal and regulatory obligations</li>
                    </ul>
                    <p className="mb-2">Upon termination or upon request from the Controller:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Personal data will be deleted from active systems</li>
                        <li>Backup copies will expire automatically as part of routine backup cycles</li>
                        <li>Any remaining logs are retained only for security, compliance, or audit purposes</li>
                    </ul>
                    <p>If you request deletion of specific data, we will act promptly unless legally restricted.</p>
                </div>

                {/* 7. International Data Transfers */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">7. International Data Transfers</h2>
                    <p className="mb-2">Depending on your region, data may be processed in or transferred to other countries. Where necessary, we use:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Standard Contractual Clauses (SCCs) for EU transfers</li>
                        <li>DPDP-compliant safeguards for Indian users</li>
                        <li>Industry-standard compliance frameworks for US and other regions</li>
                    </ul>
                    <p className="mt-2">We ensure equivalent protection irrespective of the hosting region.</p>
                </div>

                {/* 8. Rights of the Controller and Users */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">8. Rights of the Controller and Users</h2>
                    <p className="mb-2">We provide reasonable assistance to enable you to fulfill data subject rights under applicable laws including:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Access requests</li>
                        <li>Correction of inaccurate data</li>
                        <li>Deletion requests</li>
                        <li>Objections to processing</li>
                        <li>Data portability</li>
                        <li>Consent withdrawal</li>
                    </ul>
                    <p>If your account is institution-managed, users must submit requests through the institution.</p>
                </div>

                {/* 9. Confidentiality */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">9. Confidentiality</h2>
                    <p className="mb-2">All personnel authorized to process personal data are bound by strict confidentiality obligations. We will not disclose your data unless:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Requested by the Controller</li>
                        <li>Required by law</li>
                        <li>Needed to protect the safety or rights of users</li>
                        <li>Needed to operate the Platform (only via approved sub-processors)</li>
                    </ul>
                </div>

                {/* 10. Data Breach Notification */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">10. Data Breach Notification</h2>
                    <p className="mb-2">In the event of an actual or suspected breach affecting personal data:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>We will notify the Controller without unreasonable delay</li>
                        <li>Provide details, scope, and nature of the breach</li>
                        <li>Describe mitigation steps taken</li>
                        <li>Support the Controller in reporting obligations to legal authorities or affected users</li>
                    </ul>
                    <p>We maintain a formal incident response process to limit risk.</p>
                </div>

                {/* 11. Sub-Processor Management */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">11. Sub-Processor Management</h2>
                    <p className="mb-2">Before engaging a new sub-processor, we:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Conduct a security and privacy evaluation</li>
                        <li>Ensure contractual protections equivalent to this DPA</li>
                        <li>Take responsibility for sub-processor actions</li>
                    </ul>
                    <p>You may request a current list of sub-processors at any time.</p>
                </div>

                {/* 12. Audit Rights */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">12. Audit Rights</h2>
                    <p className="mb-2">Upon reasonable notice, and where legally required, the Controller may:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Request documentation related to data protection</li>
                        <li>Request summaries of security audits</li>
                        <li>Request verification of compliance measures</li>
                    </ul>
                    <p>Direct physical audits of facilities are permitted only where required by law and coordinated with our cloud providers.</p>
                </div>

                {/* 13. Term, Termination and Survival */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">13. Term, Termination and Survival</h2>
                    <p className="mb-2">This DPA:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Becomes effective upon acceptance of the LMS Domain Terms of Service</li>
                        <li>Remains valid as long as LMS Domain processes personal data on behalf of the Controller</li>
                        <li>Survives termination of the main agreement with respect to confidentiality and data deletion obligations</li>
                    </ul>
                </div>

                {/* 14. Contact Information */}
                <div className="content-section py-6 border-t border-gray-100 bg-gray-50 p-4 rounded-lg mt-4">
                    <h2 className="text-xl font-bold mb-4">14. Contact Information</h2>
                    <p className="mb-2">For privacy questions, compliance requests, data access, or sub-processor details:</p>
                    <p className="font-semibold">LMS Domain (Techiegram)</p>
                    <p>Email: <a href="mailto:support@lmsdomain.com" className="text-blue-600 underline">support@lmsdomain.com</a></p>
                    <p>Website: <a href="https://lmsdomain.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://lmsdomain.com</a></p>
                </div>
            </div>
        </div>
    )
}

export default DataProcessingAgreement;