import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine, FaQrcode } from "react-icons/fa";
const AboutPage = () => {
  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-2">
      <div className="bg-white w-full sm:py-10 py-8  ">
        <h1 className="sm:text-4xl text-slate-800 text-3xl font-bold italic  mb-3">
          About Linklytics
        </h1>
        <p className="text-gray-700 text-sm  mb-8 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
          Linklytics simplifies URL shortening for efficient sharing. Easily
          generate, manage, and track your shortened links. Our latest updates 
          introduce powerful features like custom aliases, automatic link expiration, 
          comprehensive geo-location analytics, and a free built-in QR Code generator. 
          Whether you're a professional marketer or just sharing links with friends, 
          Linklytics gives you full control over your online presence.
        </p>
        <div className="space-y-5 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
          <div className="flex items-start">
            <FaLink className="text-blue-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Simple URL Shortening
              </h2>
              <p className="text-gray-600">
                Experience the ease of creating short, memorable URLs in just a
                few clicks. Our intuitive interface and quick setup process
                ensure you can start shortening URLs without any hassle.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaShareAlt className="text-green-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Powerful Analytics
              </h2>
              <p className="text-gray-600">
                Gain insights into your link performance with our comprehensive
                analytics dashboard. Track total clicks, and view detailed 
                geographical data (City/Country), device types, browsers, and referral sources.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaQrcode className="text-indigo-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                QR Code Generation
              </h2>
              <p className="text-gray-600">
                Instantly generate and download customizable QR codes for your links. 
                Use our free standalone QR generator or utilize the automatic QR codes 
                for all your shortened URLs right inside the dashboard.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaEdit className="text-orange-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Custom Aliases & Expiry
              </h2>
              <p className="text-gray-600">
                Take control of your links with custom vanity aliases for brand recognition. 
                Set automatic expiration dates to disable links when campaigns end, and 
                easily delete your links at any time.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaEdit className="text-purple-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Enhanced Security
              </h2>
              <p className="text-gray-600">
                Rest assured with our robust security measures. All shortened
                URLs are protected with advanced encryption, ensuring your data
                remains safe and secure.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaChartLine className="text-red-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Fast and Reliable
              </h2>
              <p className="text-gray-600">
                Enjoy lightning-fast redirects and high uptime with our reliable
                infrastructure. Your shortened URLs will always be available and
                responsive, ensuring a seamless experience for your users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;