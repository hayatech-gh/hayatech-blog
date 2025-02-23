'use client';

import React, { useState } from 'react';
import { TbMail } from 'react-icons/tb';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { DiYahooSmall } from 'react-icons/di';
import { SiAol } from 'react-icons/si';

interface MailShareProps {
  websiteName: string;
  websiteUrl: string;
  title: string;
  id: string;
}

const MailShare = ({ websiteName, websiteUrl, title, id }: MailShareProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const emailServices = [
    {
      name: 'Gmail',
      link: `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${encodeURIComponent(`${websiteName} ${title}`)}&body=${encodeURIComponent(`${websiteName} ${title}\n${websiteUrl}blogs/${id}`)}`,
      icon: <FcGoogle className="h-10 w-10 text-red-700" />,
    },
    {
      name: 'Yahoo Mail',
      link: `https://compose.mail.yahoo.com/?to=&subject=${encodeURIComponent(`${websiteName} ${title}\n${websiteUrl}blogs/${id}`)}`,
      icon: <DiYahooSmall className="h-10 w-10 text-red-700" />,
    },
    {
      name: 'AOL Mail',
      link: `https://mail.aol.com/webmail-std/en-us/compose?to=&subject=${encodeURIComponent(`${websiteName} ${title}\n${websiteUrl}blogs/${id}`)}`,
      icon: <SiAol className="h-10 w-10 text-black" />,
    },
    {
      name: 'その他のメール',
      link: `mailto:?subject=${title}&body=${encodeURIComponent(`${websiteName} ${title}\n${websiteUrl}blogs/${id}`)}`,
      icon: <TbMail className="h-10 w-10 text-black" />,
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <button
        className="mb-1 mr-1 flex h-12 w-12 items-center justify-center rounded-lg bg-white p-3 shadow-lg transition duration-300 hover:bg-slate-100 sm:mb-0 md:h-14 md:w-14"
        onClick={() => setIsOpen(true)}
      >
        <TbMail size={25} />
      </button>

      {/* モーダル */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)} // 背景クリックでモーダルを閉じる
        >
          <div
            className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()} // モーダル本体のクリックは無効化
          >
            {/* モーダルヘッダー */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">メールで共有</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 transition duration-300 hover:text-black"
              >
                <IoIosCloseCircleOutline size={40} />
              </button>
            </div>

            {/* メールサービス一覧 */}
            <ul className="space-y-3 pl-0">
              {emailServices.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center rounded-lg p-3 shadow-md transition hover:shadow-lg ${service.color} text-black`}
                  >
                    {service.icon}
                    <span className="ml-3 text-xl font-medium">
                      {service.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailShare;
