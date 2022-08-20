import React from "react";
import Delivery from "../assets/delivery.png";
import HeroBg from "../assets/heroBg.png";
import { heroData } from "../utils/data";

function HomeContainer() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="gap-6 py-2 flex-1 flex flex-col justify-center items-start ">
        <div className="flex justify-center items-center gap-2 bg-orange-100 rounded-full px-2 py-1 ">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={Delivery}
              alt="delivery"
              className="w-full h-full object-contain bg-white"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.25rem] font-bold tracking-wide text-slate-800">
          The Fastest Delivery in{" "}
          <span className="text-orange-500 text-[3rem] lg:text-[5rem]">
            Your City
          </span>
        </p>

        <p className=" text-base text-slate-500 text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          accusantium itaque, delectus nihil sed tenetur minus tempora molestiae
          molestias rem, non nesciunt hic iure incidunt quibusdam perspiciatis
          exercitationem dolorem inventore!
        </p>
        <button
          type="button"
          className=" md:w-auto bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-100 ease-in-out"
        >
          Order Now
        </button>
      </div>
      <div className=" py-4 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          alt="heroBg"
          className="ml-auto lg:w-auto lg:h-650 h-420 w-full"
        />
        <div className="gap-2 absolute w-full h-full flex top-0 left-0 lg:px-32 py-16  items-center justify-center flex-wrap">
          {heroData &&
            heroData.map((item) => (
              <div
                key={item.id}
                className=" drop-shadow-lg lg:w-190 p-4 bg-slate-50 bg-opacity-50 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center"
              >
                <img
                  src={item.imgSrc}
                  alt="I1"
                  className="w-20 lg:w-40 lg:-mt-20 -mt-10"
                />
                <p className="lg:text-xl text-base font-semibold text-slate-800 mt-2 lg:mt-4">
                  {item.name}
                </p>
                <p className="lg:text-sm text-[10px] text-gray-600 lg:my-2 my-1">{item.desc}</p>
                <p className="text-sm font-semibold text-slate-800">
                  <span className="text-xs text-red-500">$</span>
                  {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default HomeContainer;
