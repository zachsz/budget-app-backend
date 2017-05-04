import * as express from 'express';
import * as db from './src/services/db';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as session from 'express-session';
import * as passport from 'passport';
import accounts from './src/controllers/accounts';

const app = express();

app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Session persisted message middleware
app.use((req, res, next) => {
    let err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;

    delete req.session.error;
    delete req.session.notice;
    delete req.session.success;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next();
});

app.use('/accounts', accounts);

db.connect(db.MODE_DEV).then(() => {
    return app.listen(3000)
}).then(() => {
    console.log('Budgeting App running on port 3000!');
}).catch(() => {
    console.log('Unable to connect to database');
});
