import React, { useState } from "react"
import { Plus, X } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// PropTypes for FAQ items and component props

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
        "e) Confirm the action in the popup. The resident will no longer have access until unfrozen."
      ]
    },
    {
      question: "What happens when SOS is triggered?",
      answer: [
        "a) An instant alert is sent to Security Personnel and Super Admins.",
        "b) The system starts an emergency roll call to track all users currently on-site.",
        "c) A real-time notification log is created under the Emergency Oversight section."
      ]
    },
    {
      question: "How do I customize notification settings?",
      answer: [
        "a) Navigate to Notification Settings in the Admin Dashboard.",
        "b) Choose the notification type (visitor arrival,approval status,emergency alert ,etc).",
        "c) You Can.",
        "   1.Edit the message template",
        "   2.Choose delivery method(SMS,email,in-app)",
        "d) Click Save Changes to apply"
      ]
    }
  ],
  contactEmail = "support@visitorgate.com",
  contactPhone = "+254 XXX XXX XXX"
}) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Card className="w-full max-w-4xl bg-white shadow-sm">
      <CardHeader className="pb-6">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex gap-8 bg-white">
        {/* FAQ Section */}
        <div className="flex-1 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">
            Frequently Asked questions (FAQs)
          </h3>
          
          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm text-gray-700 pr-4">
                    {index + 1}. {faq.question}
                  </span>
                  {openIndex === index ? (
                    <X className="h-4 w-4 text-gray-500 flex-shrink-0 transition-all duration-200 rotate-0" />
                  ) : (
                    <Plus className="h-4 w-4 text-gray-500 flex-shrink-0 transition-all duration-200 rotate-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="pb-4 pl-4 space-y-1 bg-gray-50 border border-gray-200 rounded-md mx-2 mb-2 p-3 transition-all duration-200 ease-in-out">
                    {faq.answer.map((step, stepIndex) => (
                      <p key={stepIndex} className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {step}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gray-200"></div>

        {/* Contact Support Section */}
        <div className="w-64 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">
            Contact Support
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {contactEmail}
            </p>
            <p className="text-sm text-gray-600">
              {contactPhone}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}