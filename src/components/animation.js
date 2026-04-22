import dynamic from "next/dynamic";

const Lottie = dynamic(
  () => import("lottie-react").then((mod) => mod.default),
  { ssr: false },
);

const AnimationLottie = ({ animationData, width = "95%" }) => {
  return (
    <div style={{ width }}>
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
};

export default AnimationLottie;
