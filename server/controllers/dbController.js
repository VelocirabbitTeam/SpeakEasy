const db = require('../models/dbModels.js');

const dbController = {};

dbController.testCreate = (req, res, next) => {
  const query =
    'CREATE TABLE test_table (id SERIAL PRIMARY KEY, test_column1 VARCHAR(255), test_column2 INT, test_column3 BOOLEAN);';
  console.log('dbController.test');

  return db
    .query(query)
    .then((data) => {
      console.log(data);
      return next();
    })
    .catch((err) => next(err));
};

dbController.postTranscript = async (req, res, next) => {
  const transcriptQuery =
    'INSERT INTO transcript (transcript, duration, request_id, confidence) VALUES ($1, $2, $3, $4);';
  const transcriptValues = [
    res.locals.transcript,
    res.locals.duration,
    res.locals.request_id,
    res.locals.confidence,
  ];

  db.query(transcriptQuery, transcriptValues)
    .then((data) => {})
    .then(() => next())
    .catch((err) => next(err));
};

dbController.getTranscriptId = (req, res, next) => {
  const query = 'SELECT id FROM transcript WHERE request_id = $1;';
  const values = [res.locals.request_id];
  db.query(query, values)
    .then((data) => {
      res.locals.transcriptId = data.rows[0].id;
      // console.log('transcriptId:', res.locals.transcriptId);
      return next();
    })
    .catch((err) => next(err));
};

dbController.insertWords = async (req, res, next) => {
  try {
    const words = res.locals.words;
    // console.log('words:', words);
    for (const word of words) {
      await db.query(
        'INSERT INTO words (word, start_time, end_time, confidence, punctuated_word, transcript_id) VALUES ($1, $2, $3, $4, $5, $6);',
        [
          word.word,
          word.start,
          word.end,
          word.confidence,
          word.punctuated_word,
          res.locals.transcriptId,
        ]
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};

dbController.insertAnalyzedData = (req, res, next) => {
  const query =
    'INSERT INTO analyzed_data (transcript_id, word_count, word_per_sec, avg_pause, total_pauses, words_with_pauses) VALUES ($1, $2, $3, $4, $5, $6);';
  const values = [
    res.locals.transcriptId,
    res.locals.wordCount,
    res.locals.wordPerSec,
    res.locals.averagePauseDuration,
    res.locals.totalPauses,
    res.locals.wordsWithPauses,
  ];
  db.query(query, values)
    .then((data) => {
      console.log('insertWordCountWordPerSec data:' + data);
      return next();
    })
    .catch((err) =>
      next({
        log: 'dbController.insertWordCountWordPerSec error: ' + err,
        status: 500,
        message: {
          err: 'An error occurred while inserting word count and word per sec',
        },
      })
    );
};

dbController.insertBottomThreeConfidenc = (req, res, next) => {};

dbController.getSessionData = (req, res, next) => {
  const wordsQuery =
    'SELECT id, word, start_time, end_time, transcript_id FROM words;';
  const transcriptQuery = 'SELECT id, transcript, duration FROM transcript;';

  //Querying words table
  db.query(wordsQuery)
    .then((data) => {
      res.locals.words = data.rows;
      // Querying transcript table
      db.query(transcriptQuery)
        .then((data) => {
          res.locals.transcript = data.rows;
          return next();
        })
        .catch((err) => next(err));
    })
    .catch((err) =>
      next({
        log: 'dbController.getSessionData error: ' + err,
        status: 500,
        message: { err: 'An error occurred while fetching data from DB' },
      })
    );
};
module.exports = dbController;
