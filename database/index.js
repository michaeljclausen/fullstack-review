var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(('DB CONNNNNNNNECTED!!!!!!'));
});

var repoSchema = mongoose.Schema({
  id: Number,
  ownerLogin: String,
  avatarUrl: String,
  name: String,
  forks: Number,
  description: String,
  date: { type: Date, default: Date.now },
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;