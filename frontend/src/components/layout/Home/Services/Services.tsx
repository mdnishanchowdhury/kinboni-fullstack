"use client";

import { motion } from "framer-motion";
import { Truck, Headphones, Box, ShieldCheck, LucideIcon } from "lucide-react";
import { Card, CardContent } from "../../../ui/card";

interface FeatureItem {
  title: string;
  desc: string;
  icon: LucideIcon;
  bgColor: string;
}

const featureData: FeatureItem[] = [
  {
    title: "Fast Delivery",
    desc: "Enjoy the Convenience of Free Shipping on Every Order",
    icon: Truck,
    bgColor: "bg-[#A3E4DB]",
  },
  {
    title: "24x7 Support",
    desc: "Round-the-Clock Assistance, Anytime You Need It",
    icon: Headphones,
    bgColor: "bg-[#FFEA7F]",
  },
  {
    title: "30 Days Return",
    desc: "Your Satisfaction is Our Priority: Return Any Product Within 30 Days",
    icon: Box,
    bgColor: "bg-[#FFC090]",
  },
  {
    title: "Secure Payment",
    desc: "Seamless Shopping Backed by Safe and Secure Payment Options",
    icon: ShieldCheck,
    bgColor: "bg-[#9DE47C]",
  },
];

const Services = () => {
  return (
    <section className="py-16 px-4 md:px-0 bg-white container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureData.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="h-full"
            >
              <Card 
                className={`${item.bgColor} border-none rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow cursor-default h-full overflow-hidden`}
              >
                <CardContent className="p-10 flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div className="bg-white p-5 rounded-full mb-8 shadow-sm flex items-center justify-center">
                    <Icon size={32} className="text-slate-800" />
                  </div>

                  {/* Text Content */}
                  <h3 className="font-bold text-2xl text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-slate-800 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;