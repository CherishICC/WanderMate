const request = require('supertest');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const dbConfig = require("../app/config/db.config");
const db = require("../app/models");
const Role = db.role;

const myApp = require('../app');
const app = myApp.listen(8080);


beforeAll(async ()=>{ 
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

describe('Testing signup', function () {
    it('return status code', async ()=> {
      const response = await request(app).post('/api/auth/signup').send({
        username: "user9",
        email: "user9@gmail.com",
        password:"admin123",
        phone: "1934578990"
        }).expect(200);
    });
    it('return status code', async ()=> {
        const response = await request(app).post('/api/auth/signup').send({
          username: "admin9",
          email: "admin9@gmail.com",
          password:"admin123",
          phone: "1239957690",
          }).expect(200);
      });
      it('return status code', async ()=> {
        const response = await request(app).post('/api/auth/signup').send({
          username: "admin",
          email: "admin@gmail.com",
          password:"admin123",
          phone: "1238567890",
          }).expect(400);
      });
});

describe('Testing user', function () {
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
    it('return status code', async ()=> {
        const response = await request(app).post('/api/test/booking').set('x-access-token', token).send({
              username:"user",
              guide:"guide",
              package_name:'package',
              days:2,
              price:1000,
              location:"hyderabad",
              experience: "very good service"
          }).expect(500);
      });
      it('return status code', async ()=> {
        const response = await request(app).post('/api/test/chat/607d5cdd6d775b3c4ddd11c6').set('x-access-token', token).send({
              from:"user",
              to:"guide",
              msg:'nice package keep it up'
          }).expect(404);
      });
});

describe('Testing guide', function () {
    let token;
    let userid;
    beforeEach((done)=>{return request(app).post('/api/auth/signin').send({
                    username:"guide",
                    password:"admin123"}).end((err, response) => {
                    userid = response.body.userId;
                    token = response.body.accessToken;
                        done();
                      })});
    afterEach((done)=>{token=undefined;done()})
    // it('return status code', async ()=> {
    //   const response = await request(app).delete('/api/test/package/609a124c838b6f3060323b36').set('x-access-token', token).send({
    //     }).expect(200);
    // });
    it('return status code', async ()=> {
        const response = await request(app).get('/api/test/package/607d5cdd6d775b3c4ddd11c6').set('x-access-token', token).send({
          }).expect(200);
      });
});

describe('Testing admin', function () {
    let token;
    beforeEach((done)=>{return request(app).post('/api/auth/signin').send({
                    username:"admin",
                    password:"admin123"}).end((err, response) => {
                    token = response.body.accessToken;
                        done();
                      })});
    afterEach((done)=>{token=undefined;done()})
    it('return status code', async ()=> {
      const response = await request(app).put('/api/test/admin/6077ce0d3647219b6fb812ec').set('x-access-token', token).send({
            username:"user1",
            password:"admin123",
            email: "user1@gmail.com",
            phone:"2222222222"
        }).expect(200);
    });
    it('return status code', async ()=> {
        const response = await request(app).get('/api/test/admin/6077ce0d3647219b6fb812ec').set('x-access-token', token).send({
              username:"user1",
              password:"admin123",
              email: "user1@gmail.com",
              phone:"2222222222"
          }).expect(200);
      });
});





