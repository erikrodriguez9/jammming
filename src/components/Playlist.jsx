import Tracklist from './Tracklist';

function Playlist({ name, tracks, onRemove, onNameChange, onSave }) {
    return (
        <div className="Playlist">
            <h2>Playlist</h2>
            <input type="text" value={name} onChange={(e) => onNameChange(e.target.value)} />
            <Tracklist tracks={tracks} onRemove={onRemove} />
            <button onClick={onSave}>Save to Spotify</button>
        </div>
    );
};

export default Playlist;