const request = require('supertest');
const app = require('./app');

describe('Cats API', () => {
  it('GET /cats --- > array cats', () => { 
    //simulate fake req with supertest:
    return request(app)
      .get('/cats')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        // jest assertions
        // when I call /todos on the API I should get some kind of array of objects each with name and completed
        expect(response.body).toEqual(expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            sleeping: expect.any(Boolean),
          }),
        ])
      );
    });
  });

  it('GET /cats/:id --- > specific cat by id', () => { 
    return request(app)
      .get('/cats/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        // jest assertions
        // when I call /todos on the API I should get some kind of array of objects each with name and completed
        expect(response.body).toEqual(expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          sleeping: expect.any(Boolean)
        })
      );
    });
  });

  it('GET /cats/:id --- > returns 404 if not found', () => { 
    return request(app)
      .get('/cats/9999')
      .expect(404);
  });

  it('POST /cats --- > created cat', () => { 
    return request(app)
      .post('/cats')
      .send({
        name: 'Snuggles Maurice',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        // jest assertions
        // when I call /todos on the API I should get some kind of array of objects each with name and completed
        expect(response.body).toEqual(
          expect.objectContaining({
            name: 'Snuggles Maurice',
            sleeping: true,
          }),
      );
    });
  });

  it('POST /cats --- > validates request body', () => { 
    return request(app).post('/cats')
    .send({ name: 123 })
    .expect(422);
  });

})