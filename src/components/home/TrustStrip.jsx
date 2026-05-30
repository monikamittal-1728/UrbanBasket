import React from "react";
import {
  MdOutlineLocalShipping,
  MdOutlineLock,
  MdOutlineAssignmentReturn,
  MdOutlineWorkspacePremium,
} from "react-icons/md";

const TrustStrip = () => {
  const trustData = [
    {
      title: "Free Delivery",
      des: "On orders above ₹499",
      icon: MdOutlineLocalShipping,
    },
    {
      title: "Secure Payment",
      des: "100% safe & secure",
      icon: MdOutlineLock,
    },
    {
      title: "Easy Returns",
      des: "7 days return policy",
      icon: MdOutlineAssignmentReturn,
    },
    {
      title: "Best Quality",
      des: "Genuine products",
      icon: MdOutlineWorkspacePremium,
    },
  ];
  return (
    <section className="px-8 md:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {trustData.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 shrink-0">
                <Icon className="text-primary text-2xl" />
              </div>

              <div>
                <h3 className="font-semibold text-secondary">{item.title}</h3>

                <p className="text-sm text-gray-500">{item.des}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustStrip;
