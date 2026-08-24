import Tracklist from './Tracklist';

function Playlist({ name, tracks, onRemove }) {
    return (
        <div className="Playlist">
            <h2>Playlist</h2>
            <input type="text" value={name} readOnly />
            <Tracklist tracks={tracks} onRemove={onRemove} />
            <button>Save to Spotify</button>
        </div>
    );
};

export default Playlist;