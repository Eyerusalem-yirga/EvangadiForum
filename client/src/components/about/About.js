import React from "react";

export default function About() {
  return (
    <>
      <section className="w-1/2 bg-right  aboutCont">
        <div className="w-3/5 aboutWrapp">
          <p className="text-amber-500 mt-16 mb-4 textcenter">About</p>
          <h2 className="text-2xl font-semibold mb-2 textcenter">
            Evangadi Networks Q&A
          </h2>
          <p className="text-sm mb-2 text-slate-500">
          a supportive and interactive space, Evangadi Forum enhances the learning experience and empowers students to achieve their goals in the tech field.
          </p>
          <p className="text-sm mb-2 text-slate-500">
          Evangadi Forum is an innovative platform dedicated to fostering a vibrant community centered around technology and coding. Specifically designed for current, former, and prospective students of Evangadi, the forum provides a collaborative space where users can engage in tech-related Q&A discussions. This dynamic environment encourages the sharing of knowledge, resources, and experiences, helping users to deepen their understanding of various tech and coding topics while also building connections within the Evangadi community.
          </p>
          <p className="text-sm mb-2 text-slate-500">
          Focused on tech and coding-related queries, Evangadi Forum serves as a valuable resource for students at all stages of their learning journey. Whether seeking answers to complex coding problems, exploring new programming languages, or staying updated on the latest industry trends, users can find and contribute to a wealth of information. By offering a supportive and interactive platform, Evangadi Forum not only enhances the learning experience but also empowers students to achieve their goals and stay connected with like-minded individuals in the tech field.
          </p>
          <div className="textcenter">
            <button className="mt-7 px-8 py-1 bg-orange-500 text-white rounded-sm mb-20 text-sm">
              HOW IT WORKS
            </button>
          </div>
        </div>
      </section>
    </>
  );
}