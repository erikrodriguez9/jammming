import { useState } from 'react';

function Track({ name, artist, album }) {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{name}</h3>
                <p>{artist} | {album}</p>
            </div>
            <button>+</button>
        </div>
    );
};

export default Track;