'use client'

import React, { useState } from 'react';
import { FaLink } from 'react-icons/fa';

const socialMediaPlatforms = [
  'Facebook',
  'Twitter',
  'Instagram',
  'LinkedIn',
  'YouTube',
];

const SocialMediaForm = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [link, setLink] = useState('');

  return (
    <form className="w-full  space-y-4 bg-[#FAFAFA] rounded-lg ">
      <div>
        <label className="font-instrument-sans text-[12px] font-normal leading-[18px] text-left text-[#333333]" htmlFor="platform">
          Platform
        </label>
        <select
          id="platform"
          className=" font-instrument-sans text-[16px] font-normal leading-[24px] text-left text-[#333333] w-full pt-3 pb-3 pl-4 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
        >
          <option value="" disabled>
            Select a platform
          </option>
          {socialMediaPlatforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-instrument-sans text-[12px] font-normal leading-[18px] text-left text-[#333333]" htmlFor="link">
          Link
        </label>
        <div className="relative">
          <FaLink className="absolute top-1/2 transform -translate-y-1/2 left-5 text-gray-400" />
          <input
            id="link"
            type="text"
            className="font-instrument-sans text-[16px] font-normal leading-[24px] text-left text-[#333333]  w-full pt-3 pb-3 pl-12 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="https://example.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </div>

      {/* <button
        type="submit"
        className="w-full p-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
      >
        Submit
      </button> */}
    </form>
  );
};

export default SocialMediaForm;
