export default function Hint({ plant, setView }) {
    return (
        <>
            <p className="text-center text-2xl">Try to find this plant</p>
            <img src={`/botanical-garden/images/${plant[0]}/${plant[1]}/0.webp`} alt="" />
            <div className="mt-5 flex justify-center">
                <button className="text-2xl bg-primary" onClick={() => { setView(1) }}>Scan QR</button>
            </div>
        </>
    )

}