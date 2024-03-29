const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const speakers = await speakersService.getList();
      const speakersArtworks = await speakersService.getAllArtwork();
      response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers: speakers,
        artworks: speakersArtworks,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortName', async (request, response, next) => {
    try {
      const speaker = await speakersService.getSpeaker(request.params.shortName);
      const speakerArtworks = await speakersService.getArtworkForSpeaker(request.params.shortName);
      response.render('layout', {
        pageTitle: 'Speaker :' + speaker.name,
        template: 'speakers-detail',
        speaker: speaker,
        artworks: speakerArtworks,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
