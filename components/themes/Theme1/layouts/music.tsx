import { useTheme1 } from "@/hooks/themes/useTheme1";
import React, { FC } from "react";
import { BiPause, BiPlay } from "react-icons/bi";

interface Props {
  actions: useTheme1["actions"];
  state: useTheme1["state"];
  refs: useTheme1["refs"];
}

const MusicComponent: FC<Props> = (props) => {
  if (props.state.client?.music)
    return (
      <div className="fixed bottom-4 right-4 z-50" data-aos="zoom-in-up">
        <button
          onClick={props.actions.handlePlayPause}
          className="w-8 h-8 md:h-12 md:w-12 lg:h-16 lg:w-16 bg-theme1-primary rounded-full overflow-hidden flex justify-center items-center text-white text-xl relative shadow-sm md:text-2xl lg:text-3xl"
        >
          <span className="absolute inset-0 bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat opacity-20"></span>
          {props.state.isPlaying ? <BiPause /> : <BiPlay />}
        </button>
        <audio
          ref={props.refs.audioRef}
          src={props.state.client?.music as string}
          autoPlay
          loop
        />
      </div>
    );
};

export default MusicComponent;
