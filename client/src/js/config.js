// const serverUrl = 'http://localhost:8888/';
const serverUrl = 'http://127.0.0.1:8888/';
const captchaSiteKey = '6LdIYVUaAAAAAOlshMCsFYXjiScnojmNQXj1lMDt';
export default {
    url: (path) =>serverUrl + path,
    captchaSiteKey: () => captchaSiteKey
}
