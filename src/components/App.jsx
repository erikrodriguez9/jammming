import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import { useState } from 'react'

function App() {
    const sampleTracks = [
        { id: 1, name: 'Un Verano Sin Ti', artist: 'Bad Bunny', album: 'Un Verano Sin Ti' },
        { id: 2, name: 'oh yeah?', artist: 'Steve Lacy', album: 'Oh yeah?' },
        { id: 3, name: 'EVERYTHING HALLELUJAH', artist: 'Justin Bieber', album: 'SWAG II' }
    ];

    const [searchResults, setSearchResults] = useState(sampleTracks);
    const [playlistTracks, setPlaylistTracks] = useState(sampleTracks);
    const [playlistName, setPlaylistName] = useState('My Playlist');

    function addTrack(track) {
        if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }
        setPlaylistTracks([...playlistTracks, track]);
    };

    function removeTrack(track) {
        setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
    }

    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <SearchBar />
            <div className="App-playlist">
                <SearchResults tracks={searchResults} onAdd={addTrack} />
                <Playlist name={playlistName} tracks={playlistTracks} onRemove={removeTrack} />
            </div>
        </div>
    );
};

export default App;