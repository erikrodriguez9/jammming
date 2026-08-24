import Track from './Track';

function Tracklist({ tracks, onAdd }) {
    return (
        <div className="Tracklist">
            {tracks.map(track => (
                <Track 
                    key={track.id}
                    name={track.name}
                    artist={track.artist}
                    album={track.album}
                    onAdd={onAdd}
                    track={track}
                />
            ))}
        </div>
    );
};

export default Tracklist;