import { useState } from "react"

export default function DialoguePanel({ script, setView }) {
    let [step, setStep] = useState(0)
    const totalSteps = Object.keys(script ?? {}).length

    return (
        <div>
            {step < totalSteps && (
                <div className="" onClick={() => setStep(step + 1)}>
                    <h1 className="text-xl">{script[step]}</h1>
                </div>
            )}
            {step == totalSteps && setView(3)}
        </div>
    )
}