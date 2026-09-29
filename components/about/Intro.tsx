"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section
      id="intro"
      className="bg-[#f3f0e8] py-32 text-[#151515] md:py-48"
    >
      <div className="container">
        <div className="grid gap-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-2">
            <p className="eyebrow !text-[#77736b]">01 / Introduction</p>
          </div>

          <div className="md:col-span-8 md:col-start-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9 }}
              className="section-title"
            >
              I believe meaningful work begins with{" "}
              <span className="italic text-[#8e7143]">curiosity.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-12 max-w-2xl text-base leading-8 text-black/55 md:text-lg"
            >
              From understanding a problem to creating something useful, my
              work sits at the intersection of science, creativity, product
              development and entrepreneurship.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}