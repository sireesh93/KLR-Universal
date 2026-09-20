import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy | KLR Universal",
  description:
    "How KLR Universal collects, uses, and protects the personal information you share through this website.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | KLR Universal",
    description: "How KLR Universal collects, uses, and protects the personal information you share through this website.",
    url: "/privacy-policy",
    type: "website",
  },
};

const LAST_UPDATED = "19 September 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy",
        "url": "https://klruniversal.com/privacy-policy",
        "inLanguage": "en",
        "isPartOf": { "@type": "WebSite", "@id": "https://klruniversal.com" },
        "publisher": { "@id": "https://klruniversal.com/#organization" },
      }} />
      <Header />
      <main className="flex-1">
        <section className="bg-klr-header py-10">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h1 className="text-3xl font-medium leading-tight md:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-black/60">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <div className="space-y-8 text-black/75">
              <p>
                This policy explains what personal information KLR Universal
                collects through this website, why we collect it, and what
                choices you have. It applies to this website and any page that
                links to this policy.
              </p>

              <div>
                <h2 className="text-xl font-semibold text-black">Who we are</h2>
                <p className="mt-3">
                  KLR Universal manufactures drilling rigs and rock drilling
                  tools. Our address is Survey No. 222/1, Near Nagarjuna Nagar,
                  Colony Cherlapally Road, RR District, Hyderabad 500062,
                  Telangana, India. For any question about this policy or your
                  information, write to{" "}
                  <a
                    href="mailto:sales@klruniversal.com"
                    className="text-klr-red hover:underline"
                  >
                    sales@klruniversal.com
                  </a>{" "}
                  or call +91 9030327878.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Information we collect
                </h2>
                <p className="mt-3">
                  We only collect information you choose to give us. When you
                  submit an enquiry through a form on this site, we receive:
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5">
                  <li>Your name, email address, phone number and country</li>
                  <li>
                    The technical details of your requirement — drilling depth,
                    drilling diameter, product category and product of interest
                  </li>
                  <li>Anything else you write in the message field</li>
                </ul>
                <p className="mt-3">
                  We do not ask for payment details, identity documents, or any
                  special category of personal data through this website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">How we use it</h2>
                <p className="mt-3">
                  Enquiry information is used to respond to you, prepare a
                  quotation, recommend suitable equipment, and keep a record of
                  our correspondence. We rely on your consent, and on our
                  legitimate interest in answering enquiries about our products,
                  as the basis for this processing.
                </p>
                <p className="mt-3">
                  We do not sell your information, and we do not use it to send
                  marketing you did not ask for.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Cookies and analytics
                </h2>
                <p className="mt-3">
                  We use Google Tag Manager on this website. Google Tag Manager
                  loads when a page opens, but it is configured with Google
                  Consent Mode so that no analytics or advertising cookies are
                  set until you accept them in the consent banner.
                </p>
                <p className="mt-3">
                  If you accept, Google Analytics places cookies that tell us
                  which pages are useful, how visitors reach the site, and how
                  it performs. This information is about how the site is used,
                  not about who you are, and we do not use it to identify you.
                  Google acts as our data processor for this and may handle the
                  data outside India, including in the United States.
                </p>
                <p className="mt-3">
                  If you decline, no analytics or advertising cookies are set
                  and the site works exactly the same. Either way, your choice
                  is stored locally in your browser so we do not have to ask
                  again. To change it, clear this site&rsquo;s data in your
                  browser and the banner will appear on your next visit.
                </p>
                <p className="mt-3">
                  We do not use this website to build advertising profiles or to
                  retarget you elsewhere.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Who else sees your information
                </h2>
                <p className="mt-3">
                  This site is hosted by Hostinger, which processes technical
                  request data such as IP address and browser type as part of
                  serving the site securely. If you accept analytics cookies,
                  Google receives usage data through Google Tag Manager and
                  Google Analytics, as described above. Enquiry details are
                  shared inside
                  KLR Universal with the sales and engineering colleagues who
                  need them to answer you, and with our dealers or service
                  partners where your enquiry relates to a territory they cover.
                  We do not share your information with anyone else unless the
                  law requires it.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  International transfers
                </h2>
                <p className="mt-3">
                  We serve customers in more than 60 countries, so information
                  you send may be handled in India, where we are based, and in
                  the countries where our hosting provider operates. Where the
                  law requires safeguards for such transfers, we put them in
                  place.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  How long we keep it
                </h2>
                <p className="mt-3">
                  We keep enquiry correspondence for as long as needed to serve
                  you and to meet our commercial and legal record-keeping
                  obligations. When it is no longer needed, we delete it.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">Your rights</h2>
                <p className="mt-3">
                  Depending on where you live, you may have the right to ask for
                  a copy of the information we hold about you, to have it
                  corrected or deleted, to object to how we use it, or to
                  withdraw consent you previously gave. Write to{" "}
                  <a
                    href="mailto:sales@klruniversal.com"
                    className="text-klr-red hover:underline"
                  >
                    sales@klruniversal.com
                  </a>{" "}
                  and we will respond within the period the applicable law
                  allows.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Changes to this policy
                </h2>
                <p className="mt-3">
                  If we change how we handle personal information, we will update
                  this page and change the date at the top. Please check back
                  from time to time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
