import React, { Suspense } from 'react';
const RemoteButton = React.lazy(() => import('app2/Button'));
const RemoteArtists = React.lazy(() => import('app2/Artists'));

 const App = () => {
    return (
        <div>
            <h4>Basic Host-Remote</h4>
            <h1>App 1</h1>
            <div className="host__top">
                <Suspense fallback={'...loading...'}>
                    <RemoteButton />
                    <RemoteArtists />
                </Suspense>
            </div>
        </div>
    )
}

export default App;