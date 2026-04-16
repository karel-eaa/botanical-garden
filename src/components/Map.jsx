export default function Map({ setView, setStartDialogue }) {
    return (
        <div className="flex flex-col">
            <button onClick={() => { setStartDialogue(11); setView(2) }}>Room 11</button>
            <button onClick={() => { setStartDialogue(12); setView(2) }}>Room 12</button>
            <button onClick={() => { setStartDialogue(13); setView(2) }}>Room 13</button>
            <button onClick={() => { setStartDialogue(14); setView(2) }}>Room 14</button>
        </div>
    )
}