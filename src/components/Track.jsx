import { useState } from 'react';

function Track({ name, artist, album, track, onAdd, onRemove }) {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{name}</h3>
                <p>{artist} | {album}</p>
            </div>
            {onAdd && <button onClick={() => onAdd(track)}>+</button>}
            {onRemove && <button onClick={() => onRemove(track)}>-</button>}
        </div>
    );
};

export default Track;