import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HelpSupportCard({
  title = "Help & Support",
  faqs = [
    {
      question: "How do I freeze a resident's account?",
      answer: [
        "a) Go to User Management from the Admin Dashboard.",
        "b) Search for the resident's name or unit number.",
        "c) Click the 'three dot' button in the action column.",
        "d) Select 'Freeze Account'.",
        "e) Confirm the action in the popup. The resident will no longer have access until unfrozen.",
      ],
    },
    {
      question: "What happens when SOS is triggered?",
      answer: [
        "a) An instant alert is sent to Security Personnel and Super Admins.",
        "b) The system starts an emergency roll call to track all users currently on-site.",
        "c) A real-time notification log is created under the Emergency Oversight section.",
      ],
    },
    {
      question: "How do I customize notification settings?",
      answer: [
        "a) Navigate to Notification Settings in the Admin Dashboard.",
        "b) Choose the notification type (visitor arrival, approval status, emergency alert, etc).",
        "c) You can:",
        "   1. Edit the message template",
        "   2. Choose delivery method (SMS, email, in-app)",
        "d) Click Save Changes to apply.",
      ],
    },
  ],
  contactEmail = "support@visitorgate.com",
  contactPhone = "+254 XXX XXX XXX",
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Card className="w-full max-w-[740px] p-4 shadow-sm border border-gray-200 bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex gap-6 border-t border-gray-100 pt-4">
        {/* FAQs */}
        <div className="flex-1 pr-4 border-r border-gray-200">
          <h3 className="text-sm font-medium text-gray-800 mb-4">
            Frequently Asked questions (FAQs)
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between py-2 text-left"
                >
                  <span className="text-sm text-gray-700 font-medium">
                    {index + 1}. {faq.question}
                  </span>
                  {openIndex === index ? (
                    <X className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Plus className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mt-1 text-sm text-gray-600 space-y-1">
                    {faq.answer.map((step, i) => (
                      <p key={i} className="leading-relaxed">
                        {step}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="w-64 pl-4">
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Contact Support
          </h3>
          <p className="text-sm text-gray-600 mb-2">{contactEmail}</p>
          <p className="text-sm text-gray-600">{contactPhone}</p>
        </div>
      </CardContent>
    </Card>
  );
}
