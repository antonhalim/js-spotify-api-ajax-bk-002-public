var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest";

var dataSetProperties = {
  label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count',
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
}

$(function() {
  getSpotifyTracks(success);
});

function extractTop20Tracks(tracks) {
  return tracks.slice(0,20);
}

function extractNumberOfStreams(tracks) {
  for(var i = 0, arr = []; i < tracks.length; i++){
      arr.push(tracks[i].num_streams);
  }
  return arr;
}

function extractNames(tracks) {
    for(var i = 0, arr = []; i < tracks.length; i++){
        arr.push(tracks[i].track_name);
    }
    return arr;
}

function chartData(labels, inputData) {
    dataSetProperties.data = inputData;
    var arr = {labels: labels, datasets: [dataSetProperties]};
    return arr;
}

function getSpotifyTracks(callback){
    $.ajax({
        url: url,
        contentType: "application/json",
        dataType: 'jsonp',
        success: callback
    });
}

function success(parsedJSON) {
    var tracks = extractTop20Tracks(parsedJSON.tracks);
    var data = chartData(extractNames(tracks), extractNumberOfStreams(tracks));
    var ctx = document.getElementById("spotify-chart").getContext("2d");
    new Chart(ctx).Bar(data, {scaleShowGridLines : true});

}
