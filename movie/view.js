const createStars = (id, rating) => {
    let stars = `<div>`
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += `<a class="rating" onclick="submitRating(${id}, ${i + 1})" >✭</a>`;
        } else {
            stars += `<a class="rating" onclick="submitRating(${id}, ${i + 1})">✩</a>`
        }
    }
    return stars + `</div>`;
}

export function render(movies, user) {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Filmliste</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
Angemeldet als: ${user.firstname} ${
    user.lastname
  } &nbsp;&nbsp;<a href="/logout">abmelden</a>
  <table>
    <thead><tr><th>Id</th><th>Title</th><th></th><th></th></tr></thead>
    <tbody>
      ${movies
        .map(
          (movie) => `
        <tr>
          <td>${movie.id}</td>
          <td>${movie.title}</td>
          <td>${createStars(movie.id, 3)}</td>
          <td><a href="/movie/delete/${movie.id}">löschen</a></td>
          <td><a href="/movie/form/${movie.id}">bearbeiten</a></td> 
        </tr>`
        )
        .join('')}
    </tbody>
  </table>
  <a href="/movie/form">neu</a>
  <script>
  const submitRating = (id, rating) => {
      fetch('/movie/rating/' + id, { 
        method: 'POST',
        body: JSON.stringify({rating: rating})
    })
  }
</script>
</body>
</html>
  `;
}
