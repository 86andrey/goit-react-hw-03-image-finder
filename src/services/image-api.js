function fetchImage(imageSearch) {
  return fetch(
    `https://pixabay.com/api/?q=${imageSearch}&page=1&key=27913920-68ceae66209fe678afbf6b110&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Нет таких картинок c именем ${imageSearch}`)
    );
  });
}

const api = { fetchImage };

export default api;
