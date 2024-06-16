import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const animationVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 },
  };
  const animationVariants2 = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 50 },
  };

  const animationOptions = {
    variants: animationVariants,
    initial: "hidden",
    animate: inView && "visible",
    transition: { duration: 0.5 },
  };
  const animationOptions2 = {
    variants: animationVariants2,
    initial: "hidden",
    animate: inView && "visible",
    transition: { duration: 0.5 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <div>
      <div class=" bg-gray-900 w-screen h-screen">
        <div class="grid  max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <motion.div
            ref={ref}
            animate={controls}
            {...animationOptions}
            class="mr-auto mt-20 place-self-center lg:col-span-7"
          >
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
              Recipe Hub , Share Your Amazing Recipes
            </h1>
            <p class="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-400">
              Unlock a world of flavors at Recipe Hub! Share your signature
              dishes, explore diverse recipes, and savor the joy of culinary
              creativity with a community of passionate home cooks
            </p>
          </motion.div>
          <motion.div
            ref={ref}
            animate={controls}
            {...animationOptions2}
            class="hidden lg:mt-0 lg:col-span-5 lg:flex"
          >
            <img src="/biryani.png" alt="mockup" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
