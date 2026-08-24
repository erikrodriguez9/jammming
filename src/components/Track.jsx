import { useState } from 'react';

function Track({ name, artist, album, track, onAdd }) {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{name}</h3>
                <p>{artist} | {album}</p>
            </div>
            <button onClick={() => onAdd(track)}>+</button>
        </div>
    );
};

export default Track;