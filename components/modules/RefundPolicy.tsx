import React from 'react';

function RefundPolicy() {
    return (
        <div className='main-padding relative w-full h-full bg-[#fff] flex flex-col items-center md:pt-[180px] pt-[140px] py-[30px] overflow-hidden font-manrope text-[#333]'>
            <div className="refund-policy w-full max-w-[1000px]">
                {/* Specific H1 styling requested */}
                <h1 className='text-center lg:text-3xl text-[24px] font-extrabold lg:mb-8 mb-4'>REFUND & CANCELLATION POLICY — LMS DOMAIN</h1>

                {/* Introduction Section */}
                <div className="content-section py-[20px] border-b border-gray-200">
                    <div className="flex gap-1 text-[16px] mb-4">
                        <span className='font-bold'>Last Updated:</span>
                        <span className='font-normal'>28/11/2025</span>
                    </div>
                    <div className="space-y-4 text-[16px] leading-relaxed">
                        <p>This Refund & Cancellation Policy (“<span className="font-bold">Policy</span>”) explains how refunds, cancellations, and billing adjustments are handled for subscriptions and services purchased on LMS Domain, operated by Techiegram. By using the Platform or subscribing to any paid plan, you agree to the terms described below.</p>
                        <p>This Policy should be read together with our Terms & Conditions and Privacy Policy.</p>
                    </div>
                </div>

                {/* 1. Subscription Nature of Service */}
                <div className="content-section py-6">
                    <h2 className="text-xl font-bold mb-4">1. Subscription Nature of Service</h2>
                    <p className="mb-2">LMS Domain is an AI-powered, multi-tenant SaaS platform that operates on a subscription basis.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Unless otherwise stated, subscriptions renew automatically at the end of each billing cycle.</li>
                        <li>You may cancel your subscription at any time; however, cancellation does not automatically entitle you to a refund unless explicitly stated in this Policy.</li>
                    </ul>
                </div>

                {/* 2. Cancellation Policy */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">2. Cancellation Policy</h2>

                    <h3 className="text-lg font-bold mt-4 mb-2">2.1 Cancel Anytime</h3>
                    <p>You may cancel your plan at any time from your dashboard or by contacting support.</p>

                    <h3 className="text-lg font-bold mt-4 mb-2">2.2 When Cancellation Takes Effect</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Cancellations take effect at the end of the current billing cycle.</li>
                        <li>You will continue to have access to the Platform until your current period expires.</li>
                        <li>After the subscription ends, access to paid features, institution tools, and AI functionalities will be revoked unless renewed.</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-4 mb-2">2.3 Institution-Level Cancellations</h3>
                    <p>For organization or institutional accounts, only the authorized administrator can request cancellation.</p>
                </div>

                {/* 3. Refund Policy */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">3. Refund Policy</h2>
                    <p className="mb-4">Refund eligibility depends on the type of subscription purchased.</p>

                    <h3 className="text-lg font-bold mt-4 mb-2">3.1 Refunds for Monthly Plans</h3>
                    <p className="mb-2">Monthly subscriptions are not eligible for refunds, except in the following cases:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Duplicate or accidental payment</li>
                        <li>Major service outage lasting more than 48 hours</li>
                        <li>Incorrect billing due to a technical error</li>
                    </ul>
                    <p className="text-sm italic text-gray-600">Refunds are granted at the sole discretion of LMS Domain.</p>

                    <h3 className="text-lg font-bold mt-4 mb-2">3.2 Refunds for Annual Plans</h3>
                    <p className="mb-2">Annual subscriptions may be eligible for pro-rated refunds only if:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>The refund request is made within 10 days of the annual purchase, <strong>AND</strong></li>
                        <li>The institution or user has not excessively used premium features (including AI tools, custom domain hosting, or data-heavy services)</li>
                    </ul>
                    <p className="text-sm italic text-gray-600">After 10 days, annual plans become non-refundable.</p>

                    <h3 className="text-lg font-bold mt-4 mb-2">3.3 No Refund for Completed Use</h3>
                    <p className="mb-2">Refunds are not available if:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Significant usage of AI features has occurred</li>
                        <li>Multiple users have accessed the institutional tenant</li>
                        <li>Substantial consumption of resources such as storage, emails, or bandwidth has taken place</li>
                        <li>The cancellation is due to lack of usage or change of mind</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-4 mb-2">3.4 Enterprise / Custom Contracts</h3>
                    <p>Enterprise plans follow custom refund and cancellation terms as outlined in the signed agreement. This Policy applies only where the contract does not override it.</p>
                </div>

                {/* 4. Failed Payments */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">4. Failed Payments & Billing Issues</h2>

                    <h3 className="text-lg font-bold mt-4 mb-2">4.1 Failed Renewals</h3>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>We will retry multiple times automatically.</li>
                        <li>Access may be temporarily limited.</li>
                        <li>If unresolved, the subscription may be downgraded or suspended.</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-4 mb-2">4.2 Recovery After Suspension</h3>
                    <p>Reactivate your plan anytime by completing the pending payment.</p>
                </div>

                {/* 5. Service Modifications */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">5. Service Modifications & AI Usage</h2>
                    <p>LMS Domain continually improves its AI-powered features, tools, security systems, and learning workflows. We may modify or discontinue features without prior notice.</p>
                    <p className="mt-2">Such changes do not qualify for refunds, unless they cause prolonged service unavailability.</p>
                </div>

                {/* 6. Data Access After Cancellation */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">6. Data Access After Cancellation</h2>
                    <p className="mb-2">Upon subscription cancellation:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                        <li>Your account remains accessible until the billing period ends.</li>
                        <li>After expiration, access is restricted.</li>
                        <li>Data stored in your tenant may be deleted per our Data Retention Policy.</li>
                    </ul>
                    <p className="mt-2"><strong>Optional:</strong> Institutions may request a one-time export of their data before expiry. Requests made after deletion cannot be fulfilled.</p>
                </div>

                {/* 7. How to Request a Refund */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">7. How to Request a Refund</h2>
                    <p className="mb-2">To request a refund, contact us at <a href="mailto:support@lmsdomain.com" className="text-blue-600 font-semibold">support@lmsdomain.com</a> with the subject line: <strong>Refund Request – LMS Domain</strong>.</p>
                    <p className="mb-2">Include:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Account email</li>
                        <li>Payment details (transaction ID or invoice)</li>
                        <li>Reason for refund</li>
                        <li>Screenshots or evidence (if applicable)</li>
                    </ul>
                    <p>Refund processing may take 5–10 business days, depending on your bank or payment provider.</p>
                </div>

                {/* 8. Amendments */}
                <div className="content-section py-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold mb-4">8. Amendments to This Policy</h2>
                    <p className="mb-2">We may update this Policy from time to time to reflect legal compliance, pricing adjustments, new features, or operational requirements.</p>
                    <p>Significant changes will be communicated through email or Platform notifications. Continued use of LMS Domain after updates constitutes acceptance.</p>
                </div>

                {/* 9. Contact Information */}
                <div className="content-section py-6 border-t border-gray-100 bg-gray-50 p-4 rounded-lg mt-4">
                    <h2 className="text-xl font-bold mb-4">9. Contact Information</h2>
                    <p className="mb-2">If you have questions about cancellations, billing, or refunds:</p>
                    <p className="font-semibold">LMS Domain (Techiegram)</p>
                    <p>Email: <a href="mailto:support@lmsdomain.com" className="text-blue-600 underline">support@lmsdomain.com</a></p>
                    <p>Website: <a href="https://lmsdomain.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://lmsdomain.com</a></p>
                </div>
            </div>
        </div>
    )
}

export default RefundPolicy;