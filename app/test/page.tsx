import React from "react";

const TestPage = () => {
  return (
    <div className="w-full flex flex-col container mx-auto mt-32 items-center justify-center">
      <p className="text-3xl text-white font-bold mb-36">Hello TEST</p>

      <ul
        className="list-none p-0 grid grid-cols-1 gap-[4vw] pb-[calc(4*1.5em)] mb-[4vw]"
        style={{ gridTemplateRows: "repeat(4, 30vh)" }}
      >
        <li className="sticky top-0 pt-[11.5em]">
          <div className="bg-[#52b2cf] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 1</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[13em]">
          <div className="bg-[#e5a36f] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 2</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[14.5em]">
          <div className="bg-[#9cadce] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 3</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[16em]">
          <div className="bg-[#d4afb9] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 4</h2>
          </div>
        </li>
      </ul>

      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-[#000A19] w-full h-40 flex items-center justify-center"
        >
          <p className="text-white">Hello TEST</p>
        </div>
      ))}

      <ul
        className="list-none p-0 grid grid-cols-1 gap-[4vw] pb-[calc(4*1.5em)] mb-[4vw]"
        style={{ gridTemplateRows: "repeat(4, 30vh)" }}
      >
        <li className="sticky top-0 pt-[11.5em]">
          <div className="bg-[#52b2cf] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 1</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[13em]">
          <div className="bg-[#e5a36f] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 2</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[14.5em]">
          <div className="bg-[#9cadce] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 3</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[16em]">
          <div className="bg-[#d4afb9] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 4</h2>
          </div>
        </li>
      </ul>

      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-[#000A19] w-full h-40 flex items-center justify-center"
        >
          <p className="text-white">Hello TEST</p>
        </div>
      ))}

      <ul
        className="list-none p-0 grid grid-cols-1 gap-[4vw] pb-[calc(4*1.5em)] mb-[4vw]"
        style={{ gridTemplateRows: "repeat(4, 30vh)" }}
      >
        <li className="sticky top-0 pt-[11.5em]">
          <div className="bg-[#52b2cf] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 1</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[13em]">
          <div className="bg-[#e5a36f] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 2</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[14.5em]">
          <div className="bg-[#9cadce] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 3</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[16em]">
          <div className="bg-[#d4afb9] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 4</h2>
          </div>
        </li>
      </ul>

      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-[#000A19] w-full h-40 flex items-center justify-center"
        >
          <p className="text-white">Hello TEST</p>
        </div>
      ))}

      <ul
        className="list-none p-0 grid grid-cols-1 gap-[4vw] pb-[calc(4*1.5em)] mb-[4vw]"
        style={{ gridTemplateRows: "repeat(4, 30vh)" }}
      >
        <li className="sticky top-0 pt-[11.5em]">
          <div className="bg-[#52b2cf] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 1</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[13em]">
          <div className="bg-[#e5a36f] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 2</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[14.5em]">
          <div className="bg-[#9cadce] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 3</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[16em]">
          <div className="bg-[#d4afb9] p-[30px] rounded-[50px] shadow-lg h-40 flex justify-center items-center transition-all duration-500">
            <h2 className="text-4xl">Card 4</h2>
          </div>
        </li>
      </ul>

      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-[#000A19] w-full h-40 flex items-center justify-center"
        >
          <p className="text-white">Hello TEST</p>
        </div>
      ))}
    </div>
  );
};

export default TestPage;
