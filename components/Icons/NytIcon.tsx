import Image from "next/image";
import React from "react";
import icon from "../../assets/NYTLogoHalfTone_White.png";

function NytIcon() {
  return (
    <div style={{ marginTop: '-10px' }} >
      <Image src={icon} alt="NYT Top Stories Aggregator" height={120} width={120} />
    </div>
  );
}

export default NytIcon;
