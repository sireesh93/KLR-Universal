import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | KLR Universal",
  description:
    "The terms that apply when you use the KLR Universal website, including use of content, product information, and enquiries.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "5 September 2026";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-klr-header py-10">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h1 className="text-3xl font-medium leading-tight md:text-4xl">
              Terms of Use
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
                These terms apply when you use this website. By browsing the site
                or sending us an enquiry, you accept them. If you do not accept
                them, please do not use the site.
              </p>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  About this site
                </h2>
                <p className="mt-3">
                  This website is operated by KLR Universal, Survey No. 222/1,
                  Near Nagarjuna Nagar, Colony Cherlapally Road, RR District,
                  Hyderabad 500062, Telangana, India. It exists to present our
                  drilling rigs and rock drilling tools and to let you contact us
                  about them.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Product information is indicative
                </h2>
                <p className="mt-3">
                  Specifications, capacities, dimensions and images on this site
                  describe our products in general terms. We improve our
                  equipment continuously, and machines are configured to each
                  application, so the specification of the unit we supply may
                  differ from what is shown here.
                </p>
                <p className="mt-3">
                  Nothing on this site is an offer to sell or a commitment to
                  supply. Binding specifications, prices, lead times and
                  commercial terms are those set out in a written quotation or
                  contract issued by KLR Universal.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Safe use of equipment
                </h2>
                <p className="mt-3">
                  Drilling equipment is operated in hazardous conditions.
                  Information on this site is not operating instruction, training
                  material, or engineering advice for a specific site. Always
                  follow the manuals, safety instructions and training supplied
                  with the equipment, and the regulations that apply where you
                  work.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Using our content
                </h2>
                <p className="mt-3">
                  The text, images, drawings, specifications, logos and page
                  designs on this site belong to KLR Universal or our licensors
                  and are protected by intellectual property law. You may view the
                  site, and print or download extracts, for your own business
                  assessment of our products.
                </p>
                <p className="mt-3">
                  You may not republish our content, use it commercially, use our
                  name or marks, or present our material as your own, without our
                  written permission.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Your enquiries
                </h2>
                <p className="mt-3">
                  When you send an enquiry, please give accurate information — the
                  recommendation we make depends on it. Do not send confidential
                  material you do not want us to hold, and do not submit anything
                  unlawful or that infringes someone else&rsquo;s rights. We
                  handle the information you send in line with our{" "}
                  <a href="/privacy-policy" className="text-klr-red hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Availability and third-party links
                </h2>
                <p className="mt-3">
                  We aim to keep the site available and accurate, but we do not
                  guarantee it will be uninterrupted or error free, and we may
                  change or withdraw any part of it. Where we link to another
                  organisation&rsquo;s site, we are not responsible for its
                  content.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">Liability</h2>
                <p className="mt-3">
                  To the extent the law allows, KLR Universal is not liable for
                  loss arising from reliance on information published on this
                  site, or from the site being unavailable. Nothing in these terms
                  limits liability that cannot lawfully be limited, including
                  liability for death or personal injury caused by negligence, or
                  for fraud.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Governing law
                </h2>
                <p className="mt-3">
                  These terms are governed by the laws of India, and the courts at
                  Hyderabad, Telangana have jurisdiction over any dispute about
                  them or about use of this site.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-black">
                  Changes and contact
                </h2>
                <p className="mt-3">
                  We may update these terms; the version on this page at the time
                  you use the site is the one that applies. For any question about
                  them, write to{" "}
                  <a
                    href="mailto:sales@klruniversal.com"
                    className="text-klr-red hover:underline"
                  >
                    sales@klruniversal.com
                  </a>
                  .
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
