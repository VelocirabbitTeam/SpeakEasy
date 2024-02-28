const { createClient } = require('@deepgram/sdk');
const deepgram = createClient('d3b121ea821296238a901f7eddf6733cfe477c92');
const fs = require('fs');
const path = require('path');

const Transcript = require('../models/transcriptModels.js');
const User = require('../models/dbModels.js');

const apiController = {};

// calling speech-to-text api with new recordin
apiController.getTranscribeData = (req, res, next) => {
  //new recording expected in the body

  // make a call to api
  return next();
};

apiController.createTranscript = async (req, res, next) => {
  try {
    const { userID } = req.body;
    const findUser = await User.findById({ _id: userID }).exec();
    if (findUser) {
      console.log('in api controller');
      const { content } = req.body;
      console.log('content: ', content);

      const newTranscript = await new Transcript({ user: findUser._id, content }).save();

      console.log('newTranscript: ', newTranscript);

      if (newTranscript) {
        res.locals.newTranscript = newTranscript;
        return next();
      } else {
        res.status(403).json('Cannot create new transcript!');
      }
    }
  } catch (err) {
    return next(err);
  }
};

apiController.getTranscript = async (req, res, next) => {
  try {
    const { userID } = req.body;
    const findUser = await User.findById({ _id: userID }).exec();
    if (findUser) {
      console.log('in api controller');
      const { content } = req.body;
      console.log('content: ', content);

      const transcript = await Transcript.findOne({ user: findUser._id });

      console.log('transcript: ', transcript);

      if (transcript) {
        res.locals.transcript = transcript;
        return next();
      } else {
        res.status(403).json('Cannot get transcript!');
      }
    }
  } catch (err) {
    return next(err);
  }
};

apiController.analyzeAudioFile = async (req, res, next) => {
  const audio = fs.readFileSync(
    path.join(__dirname, '../../client/assets/fake-it-till-u-make-it.mp3')
  );
  //post transcribe data to database
  try {
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      audio,
      {
        model: 'nova-2',
        smart_format: true,
        language: 'en-US',
        filler_words: true,
        puctuate: 'verbatim',
      }
    );
    res.locals.transcript =
      result.results.channels[0].alternatives[0].transcript;
    res.locals.confidence =
      result.results.channels[0].alternatives[0].confidence;
    res.locals.words = result.results.channels[0].alternatives[0].words;
    res.locals.paragraphs =
      result.results.channels[0].alternatives[0].paragraphs;
    res.locals.request_id = result.metadata.request_id;
    res.locals.duration = result.metadata.duration;
    // res.locals.start = result.start;
    // res.locals.is_final = result.is_final;
    // res.locals.speech_final = result.speech_final;

    return next();
  } catch (err) {
    console.error('Error: ', err);
    return next(err);
  }
};
module.exports = apiController;
