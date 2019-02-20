const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET / apps', () => {
  it('should return an array of apps', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys('App', 'Rating', 'Genres')
      })
  })
  it('should return a 400 error when sort is not Rating or App', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'title'})
      .expect(400, 'Sort must be either Rating or App')
  })
  it('should return a 400 error when genres is not a valid selection', () => {
    return request(app)
      .get('/apps')
      .query({genres: 'Education'})
      .expect(400, "Genres must be one of 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'")
  })
})