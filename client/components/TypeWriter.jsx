import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const TypeWriter = () => {
  const [text] = useTypewriter({
    words: [
      "Your personal speaking coach. Practice anytime, get instant feedback, and master your presentation professionalism. Your personal speaking coach. Practice anytime, get instant feedback, and master your presentation professionalism. Your personal speaking coach. Practice anytime, get instant feedback, and master your presentation professionalism. Your personal speaking coach. Practice anytime, get instant feedback, and master your presentation professionalism."
    ],
    loop: {},
    typeSpeed: 10,
  });
  return (
    <div className="text-wrap">
      {text}
      <span>
        <Cursor />
      </span>
    </div>
  );
};

export default TypeWriter;
