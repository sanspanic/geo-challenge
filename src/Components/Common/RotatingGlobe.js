import React from "react";
import { GlobeHemisphereWest } from "phosphor-react";

const RotatingGlobe = ({ size }) => {
  const className = size === 60 ? "mt-10 mx-auto" : "inline";
  return (
    <GlobeHemisphereWest
      className={className}
      size={size}
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
