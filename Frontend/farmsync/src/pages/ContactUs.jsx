import React from 'react';
import { FaEnvelope, FaHeadset, FaLocationDot } from 'react-icons/fa6';

const ContactUs = () => {
  return (
    <div className="space-y-5 text-white">
      <section className="app-panel p-6 md:p-7">
        <div className="micro-label">Support</div>
        <h1 className="page-title mt-2">Contact Us</h1>
        <p className="page-subtitle mt-3 max-w-2xl">
          Reach the FarmSync team any time you need help with your dashboard, crops, reports, or account.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <article className="app-panel p-6">
          <div className="mb-4 inline-flex rounded-2xl bg-emerald-400/15 p-3 text-2xl text-emerald-300">
            <FaHeadset />
          </div>
          <h2 className="text-xl font-semibold text-white">FarmSync Support</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            We help with onboarding, issue resolution, and product guidance for your farm operations.
          </p>
        </article>

        <article className="app-panel p-6">
          <div className="mb-4 inline-flex rounded-2xl bg-sky-400/15 p-3 text-2xl text-sky-300">
            <FaEnvelope />
          </div>
          <h2 className="text-xl font-semibold text-white">Email</h2>
          <a
            href="mailto:teamfarmsync@gmail.com"
            className="mt-3 inline-block text-lg font-medium text-emerald-300 transition hover:text-emerald-200"
          >
            teamfarmsync@gmail.com
          </a>
        </article>

        <article className="app-panel p-6">
          <div className="mb-4 inline-flex rounded-2xl bg-amber-400/15 p-3 text-2xl text-amber-300">
            <FaLocationDot />
          </div>
          <h2 className="text-xl font-semibold text-white">Location</h2>
          <p className="mt-3 text-lg font-medium text-slate-200">Bangalore, India</p>
        </article>
      </section>
    </div>
  );
};

export default ContactUs;
