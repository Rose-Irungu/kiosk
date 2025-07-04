export default function Card4(){
    return (
        <div className="flex justify-between">
            <div id="left" className="flex flex-col justify-between">
                <p>Live Emergency Feed</p>
                <div>{icon}</div>
            </div>

            <div id="right" className="flex flex-col justify-between">
                <p>Triggered By:{name}</p>
                <p>Status:{status}</p>
            </div>
        </div>
    );
}