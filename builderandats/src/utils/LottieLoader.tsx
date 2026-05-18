import Lottie from "lottie-react";
import loadingAnimation from "../../public/lottie/PDF.json";

export default function Loader() {
    return (
        <div className="max-w-screen max-h-200">
            <Lottie
                animationData={loadingAnimation}
                loop={true}
            />
        </div>
    );
}