import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import { useEffect, useState } from 'react'
import Spotify from '../util/Spotify';

function App() {
    const sampleTracks = [
        { id: 1, name: 'Un Verano Sin Ti', artist: 'Bad Bunny', album: 'Un Verano Sin Ti', uri: 'spotify:track:1' },
        { id: 2, name: 'oh yeah?', artist: 'Steve Lacy', album: 'Oh yeah?', uri: 'spotify:track:2' },
        { id: 3, name: 'EVERYTHING HALLELUJAH', artist: 'Justin Bieber', album: 'SWAG II', uri: 'spotify:track:3' }
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

    function updatePlaylistName(name) {
        setPlaylistName(name);
    }

    function savePlaylist() {
        const trackURIs = playlistTracks.map(track => track.uri);
        console.log('Saving playlist:', playlistName, 'with tracks:', trackURIs);
        // Logic to save the playlist to Spotify would go here

        setPlaylistName('New Playlist');
        setPlaylistTracks([]);
    }

    useEffect(() => {
        Spotify.getAccessToken().then(token => {
            console.log('Access token:', token);
        });
    }, []);

    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <SearchBar />
            <div className="App-playlist">
                <SearchResults tracks={searchResults} onAdd={addTrack} />
                <Playlist name={playlistName} tracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} />
            </div>
        </div>
    );
};

export default App;