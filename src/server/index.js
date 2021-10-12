import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
//import services from './services';
import server from './services/graphql';
import servicesLoader from './services';
import db from './database'
//import { util } from 'webpack';

const utils = {
  db,
};
const services = servicesLoader(utils);

const root = path.join(__dirname, '../../');
const app = express();

if(process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "*.amazonaws.com"]
        }
    }));
    app.use(compress());
    app.use(cors());
}
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));
const serviceNames = Object.keys(services);

for (let i = 0; i < serviceNames.length; i++) {
  const name = serviceNames[i];
  if (name === 'graphql') {
    async function startApolloServer(myserver){
      await myserver.start();
      myserver.applyMiddleware({ app });
    }
    startApolloServer(services[name]);
  } else {
    app.use(`/${name}`, services[name]);
  }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(root, '/dist/client/index.html'));
});
app.listen(8000, () => console.log('Listening on port 8000!'));