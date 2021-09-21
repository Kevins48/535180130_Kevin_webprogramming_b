const API_KEY = '9d2c22ba7f8f98a229b87b02c89c2750';

var genres = {};
$(() => {
    $.get('https://api.themoviedb.org/3/genre/movie/list', { api_key: API_KEY})
      .done((r) => {
          r.genres.forEach((genre)=> { 
            genres[genre.id] = genre.name
          })
      })
      .fail((e) => {
          alert(e.status_message);
      })
})

$('#searchButton').click((e) => {
    
    $('#error').text('');
    
    $('#searchButton')
        .empty()
        .attr('disabled', 'disabled')
        .append($('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'))
        .append(' Loading...');
    
    $('#result').empty();
    
    const data = {
        api_key: API_KEY,
        query: $('#title').val(),
        include_adult: false
    };
    
    $.get('https://api.themoviedb.org/3/search/movie', data)
        .done((r) => {
            if (r.results.length === 0) {
                $('#error').text('!!! No movie with this title.')
            } else {
                r.results.forEach((movie) => {
                    const tableCell = createCell(movie);
                    $('#result').append(tableCell);
                })
            }
        })
        .fail((e) => {
            $('#error').text(`!!! ${e.status_message}`);
        })
        .always(() => {
            $('#searchButton')
            .empty()
            .removeAttr('disabled')
            .append('Search');
        });
})

function createCell(movie) {
    var row = $('<tr></tr>');
    
    const movieNo = $('#result > tr').length + 1;
    var colNo = $('<td width="10"></td>');
    colNo.append($('<h2 class="display-5"></h2').text(`#${movieNo}`));
    row.append(colNo);

    const posterUrl = (movie.poster_path !== null) ?
        `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
        '';
    var colPoster = $('<td width="100"></td>');
    colPoster.append($(`<img src="${posterUrl}" height="200">`));
    row.append(colPoster);
    
    const td = $('<td></td>');
    row.append(td);
    
    const title = $('<h2 class="display-5"></h2>').text(movie.title);
    td.append(title);
    
    const overview = $('<p></p>').text(movie.overview);
    td.append(overview);
    
    const rating = $('<span class="badge badge-success p-2"></span>').text(`Rating: ${movie.vote_average}`);
    td.append(rating);
    
    movie.genre_ids.forEach((id) => {
        const genre = $('<span class="badge badge-warning ml-2 p-2"></span>').text(genres[id]);
        td.append(genre);
    });
    
    return row;
}