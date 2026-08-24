import Tracklist from './Tracklist';

function SearchResults ({ tracks, onAdd }) {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracks={tracks} onAdd={onAdd}/>
        </div>
    );
};

export default SearchResults;