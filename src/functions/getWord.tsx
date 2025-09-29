const getWord = () => {
    return fetch("https://random-word-api.vercel.app/api?words=1&length=5")
    .then(res => {
        return res.json();
    });
}

export default getWord