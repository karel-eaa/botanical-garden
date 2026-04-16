export default function Map({ setView, setStartDialogue }) {
    return (
        <div className="flex flex-col gap-4">
            <button className="text-2xl" onClick={() => { setStartDialogue(11); setView(2) }}>Room 11</button>
            <button className="text-2xl" onClick={() => { setStartDialogue(12); setView(2) }}>Room 12</button>
            <button className="text-2xl" onClick={() => { setStartDialogue(13); setView(2) }}>Room 13</button>
            <button className="text-2xl" onClick={() => { setStartDialogue(14); setView(2) }}>Room 14</button>
        </div>
    )
}