import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl">Want to see my more projects?</h2>
        <p className="text-gray-500 my-2">
          Click on the button and explore more projects with live links in my
          portfolio
        </p>
        <Button gradientDuoTone="purpleToPink"
        className="rounded-tl-xl rounded-bl-none
        rounded-br-xl rounded-tr-none">
          <a className="hover:underline" href="https://portfolio-topaz-iota.vercel.app/" target="_blank" rel="noopener noreferrer">
            Visit portfolio
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://cdn.pixabay.com/photo/2022/03/15/18/06/portfolio-7070886_1280.png"
          alt="Check Out Link"
        />
      </div>
    </div>
  );
};

export default CallToAction;
