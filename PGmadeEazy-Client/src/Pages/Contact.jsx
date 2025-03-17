import React from 'react';

export default function Contact() {
  return (
    <section className="bg-black/90 backdrop-blur-lg px-4 py-20">
      <div className="container mx-auto flex flex-col items-center text-center gap-6">
        
        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Contact <span className="text-orange-500">Us</span>
        </h1>
        
        {/* Subtitle */}
        <p className="max-w-2xl text-lg text-gray-400">
          Have any questions or feedback? We would love to hear from you. Reach out to us using the form below.
        </p>

        {/* Contact Form */}
        <form className="w-full max-w-2xl mt-8">
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="text-gray-400">Full Name</label>
              <input
                type="text"
                className="w-full p-3 bg-black/60 border border-gray-700 rounded text-white"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="text-gray-400">Email Address</label>
              <input
                type="email"
                className="w-full p-3 bg-black/60 border border-gray-700 rounded text-white"
                placeholder="Enter your email"
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="text-gray-400">Message</label>
              <textarea
                className="w-full p-3 bg-black/60 border border-gray-700 rounded text-white"
                rows="6"
                placeholder="Enter your message"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
