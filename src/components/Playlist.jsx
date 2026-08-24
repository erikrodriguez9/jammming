import Tracklist from './Tracklist';

function Playlist({ tracks }) {
    return (
        <div className="Playlist">
            <h2>Playlist</h2>
            <input type="text" placeholder="New Playlist" />
            <Tracklist tracks={tracks} />
            <button>Save to Spotify</button>
        </div>
    );
};

export default Playlist;