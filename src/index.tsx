import { Composition } from "remotion";
import { SamWalkingDemo } from "./compositions/SamWalkingDemo";
import { SamFounderPOV } from "./compositions/SamFounderPOV";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="SamWalkingDemo"
        component={SamWalkingDemo}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SamFounderPOV"
        component={SamFounderPOV}
        durationInFrames={2700}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
