import React from 'react';
import Image from 'next/image';
import { about } from '@/contents/about';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';

export default function About() {
  return (
    <article className="mx-auto rounded-lg border-2 border-slate-300 bg-white p-4">
      <section>
        <h2 className="mb-4 border-b-4 border-slate-300 pb-2 tracking-wider text-gray-900">
          {about.headingBlog}
        </h2>
        <p className="leading-relaxed text-gray-800">{about.descriptionBlog}</p>
      </section>
      <section className="mt-4">
        <h2 className="mb-4 border-b-4 border-slate-300 pb-2 tracking-wider text-gray-900">
          {about.headingAuthor}
        </h2>
        <figure className="mx-auto flex flex-row items-center justify-center gap-2 sm:gap-5">
          <div className="relative inline-block">
            <Image
              src="/images/profile_image.jpg"
              alt={`${about.name}のプロフィール画像`}
              width={128}
              height={128}
              className="h-24 w-24 rounded-full border-4 border-white shadow-xl sm:h-32 sm:w-32"
            />
          </div>
          <figcaption className="">
            <span className="py-2 text-base font-bold tracking-wider text-gray-900 sm:text-lg">
              {about.name}
            </span>
            <a
              href={about.githubURL}
              target="_blank"
              className="flex items-center gap-1 text-blue-400"
            >
              <span>
                <FaGithub />
              </span>
              <span>{about.githubID}</span>
            </a>
          </figcaption>
        </figure>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-800">
          {about.descriptionAuthor}
        </p>
      </section>
      {/* 経歴 */}
      <section className="mt-4">
        <h3 className="mb-2 border-b-4 border-slate-300 pb-2 tracking-wider text-gray-900">
          {about.headingCareer}
        </h3>
        <ul className="space-y-3">
          {about.careers.map((content: string, index: number) => (
            <li
              key={index}
              className="rounded-lg border-l-4 border-slate-300 bg-slate-50 p-4 text-gray-800 shadow-md"
            >
              {content}
            </li>
          ))}
        </ul>
      </section>
      {/* 使用言語 */}
      <section className="mt-4">
        <h3 className="mb-2 border-b-4 border-slate-300 pb-2 tracking-wider text-gray-900">
          {about.headingDevLang}
        </h3>
        <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-3">
          {about.skills.map((skill: React.ReactNode, index: number) => (
            <li
              key={index}
              className="rounded-lg bg-slate-50 p-2 text-center text-gray-800 shadow-md"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>
      {/* 所有資格 */}
      <section className="mt-4">
        <h3 className="mb-2 border-b-4 border-slate-300 pb-2 tracking-wider text-gray-900">
          {about.headingCertification}
        </h3>
        <h4 className="inline-block px-2 tracking-wider text-gray-900">
          {about.certification.it.heading}
        </h4>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-1">
          {about.certification.it.contents.map(
            (content: string, index: number) => (
              <li
                key={index}
                className="rounded-lg border-l-4 border-slate-300 bg-slate-50 p-4 text-gray-800 shadow-md"
              >
                {content}
              </li>
            ),
          )}
        </ul>
        <h4 className="inline-block px-2 tracking-wider text-gray-900">
          {about.certification.design.heading}
        </h4>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-1">
          {about.certification.design.contents.map(
            (content: string, index: number) => (
              <li
                key={index}
                className="rounded-lg border-l-4 border-slate-300 bg-slate-50 p-4 text-gray-800 shadow-md"
              >
                {content}
              </li>
            ),
          )}
        </ul>
        <h4 className="inline-block px-2 tracking-wider text-gray-900">
          {about.certification.other.heading}
        </h4>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-1">
          {about.certification.other.contents.map(
            (content: string, index: number) => (
              <li
                key={index}
                className="rounded-lg border-l-4 border-slate-300 bg-slate-50 p-4 text-gray-800 shadow-md"
              >
                {content}
              </li>
            ),
          )}
        </ul>
      </section>
    </article>
  );
}
