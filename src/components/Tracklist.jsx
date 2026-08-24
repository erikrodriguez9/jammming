import Track from './Track';

function Tracklist({ tracks, onAdd, onRemove }) {
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
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default Tracklist;