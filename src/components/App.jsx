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
    const [isSaving, setIsSaving] = useState(false);

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
        setIsSaving(true);
        Spotify.savePlaylist(playlistName, trackURIs).then(() => {
            setIsSaving(false);
            setPlaylistName('NewPlaylist');
            setPlaylistTracks([]);
        });
    }

    function search(term) {
        Spotify.search(term).then(tracks => {
            setSearchResults(tracks);
        });
    }

    const filteredResults = searchResults.filter(
        track => !playlistTracks.some(savedTrack => savedTrack.id === track.id)
    )

    useEffect(() => {
        const pendingTerm = window.localStorage.getItem('pending_search_term')
        if (pendingTerm) {
            window.localStorage.removeItem('pending_search_term');
            search(pendingTerm);
        }
    }, [])

    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <SearchBar onSearch={search} />
            <div className="App-playlist">
                <SearchResults tracks={filteredResults} onAdd={addTrack} />
                <Playlist name={playlistName} tracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} isSaving={isSaving} />
            </div>
        </div>
    );
};

export default App;