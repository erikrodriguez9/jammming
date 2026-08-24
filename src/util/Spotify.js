const clientId = '5fed87927b8b4f9286a2e33029858c34';
const redirectUri = 'http://127.0.0.1:5173/';
const scope = 'playlist-modify-public playlist-modify-private';

let accessToken;

// Generate a random string for the code verifier
function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Hash the verifier into a code challenge using SHA-256
async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

function base64encode(input) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const Spotify = {
  async redirectToAuthorize() {
    const codeVerifier = generateRandomString(64);
    window.localStorage.setItem('code_verifier', codeVerifier);

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.search = new URLSearchParams(params).toString();
    window.location = authUrl.toString();
  },

  async getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      // No code yet — send the user to Spotify to log in and authorize
      await this.redirectToAuthorize();
      return;
    }

    // Exchange the code for an access token
    const codeVerifier = window.localStorage.getItem('code_verifier');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    const data = await response.json();
    accessToken = data.access_token;

    // Clear the code from the URL
    window.history.pushState('Access Token', null, '/');

    return accessToken;
  },
};

export default Spotify;