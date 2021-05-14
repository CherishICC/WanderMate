const request = require('supertest');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const dbConfig = require("../app/config/db.config");
const db = require("../app/models");
const Role = db.role;

const myApp = require('../app');
const app = myApp.listen(8080);


beforeAll(async ()=>{ 
    console.log("hello");
    await db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to MongoDB.");
    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });
  });
  afterAll(async () => { 
      await mongoose.connection.close()
  });

describe('Testing login', function () {
    // user login
    it('return status code', async ()=> {
      const response = await request(app).post('/api/auth/signin').send({
            username:"user",
            password:"admin123"
        }).expect(200);
    });
    it('respond with valid HTTP status code and description and message', async ()=> {
      const response = await request(app).post('/api/auth/signin').send({
            username:"user5",
            password:"admin123"
        }).expect(404);
    });
    it('respond with valid HTTP status code and description and message', async ()=> {
      const response = await request(app).post('/api/auth/signin').send({
            username:"user",
            password:"user"
        }).expect(401);
    });
    // // admin login
    it('return status code', async ()=> {
        const response = await request(app).post('/api/auth/signin').send({
              username:"admin",
              password:"admin123"
          }).expect(200);
    });
    // guide login
    it('return status code', async ()=> {
        const response = await request(app).post('/api/auth/signin').send({
              username:"guide",
              password:"admin123"
          }).expect(200);
    });
});

// describe('Testing signup', function () {
//     it('return status code', async ()=> {
//       const response = await request(app).post('/api/auth/signup').send({
//         username: "user6",
//         email: "user6@gmail.com",
//         password:"admin123",
//         phone: "1234577890"
//         }).expect(200);
//     });
//     it('return status code', async ()=> {
//         const response = await request(app).post('/api/auth/signup').send({
//           username: "admin3",
//           email: "admin3@gmail.com",
//           password:"admin123",
//           phone: "123457890",
//           }).expect(200);
//       });
//       it('return status code', async ()=> {
//         const response = await request(app).post('/api/auth/signup').send({
//           username: "admin",
//           email: "admin2@gmail.com",
//           password:"admin123",
//           phone: "1234567890",
//           }).expect(400);
//       });
// });

describe('Testing blog', function () {
    let token;
    beforeEach((done)=>{return request(app).post('/api/auth/signin').send({
                    username:"user",
                    password:"admin123"}).end((err, response) => {
                    token = response.body.accessToken;
                        done();
                      })});
    afterEach((done)=>{token=undefined;done()})
    it('return status code', async ()=> {
      const response = await request(app).post('/api/test/blog').set('x-access-token', token).send({
            username:"user",
            location:"hyderabad",
            experience: "very good service"
        }).expect(200);
    });
});

describe('Testing blog', function () {
    let token;
    beforeEach((done)=>{return request(app).post('/api/auth/signin').send({
                    username:"user1",
                    password:"admin123"}).end((err, response) => {
                    token = response.body.accessToken;
                        done();
                      })});
    afterEach((done)=>{token=undefined;done()})
    it('return status code', async ()=> {
      const response = await request(app).put('/api/test/admin/6077cddd3647219b6fb812eb').set('x-access-token', token).send({
            username:"admin",
            password:"admin123",
            email: "user1@gmail.com",
            phone:"2222222222"
        }).expect(200);
    });
});



