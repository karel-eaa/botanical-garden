import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export default function CircularProgressBar({ image, progress}) {
    return (
        <div className="flex justify-center mt-4">
            {/* ✅ Size the wrapper div, not the component */}
            <div style={{ width: 58, height: 58 }}>
                <CircularProgressbarWithChildren value={progress}>
                    {/* ✅ Give the img explicit dimensions */}
                    <img
                        src={image}
                        alt={image}
                        style={{ width: '50%', height: '50%', objectFit: 'cover', borderRadius: '0%' }}
                    />
                </CircularProgressbarWithChildren>
            </div>
        </div>
    )
}