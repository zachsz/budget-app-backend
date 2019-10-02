import * as mongoose from 'mongoose';
import server from './server';
import config from './src/config';

server.listen(config.port);
mongoose.connect(config.db);
