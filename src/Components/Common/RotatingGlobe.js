import React from "react";
import { GlobeHemisphereWest } from "phosphor-react";

const RotatingGlobe = () => {
  return (
    <GlobeHemisphereWest
      className="mx-auto mt-10"
      size={60}
      color="darkorchid"
      weight="duotone"
    >
      <animate
        attributeName="opacity"
        values="0;1;0"
        dur="4s"
        repeatCount="indefinite"
      ></animate>
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="5s"
        from="0 0 0"
        to="360 0 0"
        repeatCount="indefinite"
      ></animateTransform>
    </GlobeHemisphereWest>
  );
};

export default RotatingGlobe;
