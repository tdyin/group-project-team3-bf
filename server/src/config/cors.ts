export const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://bf-t3-test-bucket.s3.us-west-2.amazonaws.com/',
    '*'
  ],
  optionsSuccessState: 200,
  methods: ['GET', 'POST', 'DELETE', 'PUT']
}
