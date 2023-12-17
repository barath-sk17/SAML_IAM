const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key_here',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new SamlStrategy({
  path: '/login/callback',
  entryPoint: 'https://dev-06365257.okta.com/app/dev-06365257_iamminipackage_1/exkc1n1viiT6KZhBc5d7/sso/saml',
  issuer: 'http://www.okta.com/exkc1n1viiT6KZhBc5d7',
  cert: 'MIIDqDCCApCgAwIBAgIGAYsJ36eeMA0GCSqGSIb3DQEBCwUAMIGUMQswCQYDVQQGEwJVUzETMBEG A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU MBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGRldi0wNjM2NTI1NzEcMBoGCSqGSIb3DQEJ ARYNaW5mb0Bva3RhLmNvbTAeFw0yMzEwMDcxMTIxMTRaFw0zMzEwMDcxMTIyMTRaMIGUMQswCQYD VQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsG A1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGRldi0wNjM2NTI1NzEc MBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC ggEBAOHkNcaOVKz3wlWcs9vhDN1eLv6EpzuMM937UfrIYy3L0WaKNg3nIpMAkS3gFUI22q+2vlod idCIGwH5mlVXvp/ZNu06R6PSq+6PGqF/h/nfs2mtV9M1HD8wmqPu20iGqa51gm73eZPWNLgWuVWC HmLbpjGiBnJvE4nmhbTdqudSX64ogYbqH5ksEwBJjiddmlM5RKuia/wxdR+OKuAyHTTYa053YS8U YkwZPMqqOYd/vN7iu/nHD/Noalmedogouiw3tDJiIeLBIxkNZVI69H5/mOmVyvTZOMj3T8B+TcMZ ZisKxifTxv9eDjJuw8FE1lRZL/EHG/GphvK5aAHp7EECAwEAATANBgkqhkiG9w0BAQsFAAOCAQEA wl7mdW4sGqvCSpAI8KLF1Ys6dxbU8uq003aOZKOm0g3bNiBYx/DxyYyw4+7AEtz8bXnVLsKXL05T DHsRgLPnCq4DX92TAgqeLKZGu6LVW1+Z8/Muns0cgxeTqzFFqEWTS5lY/LXx0C9BtT5xtfDES3ZC bwV0cIdHZojmtS5RO83V94ydJL15iyimuizXfKpMJpAcvV2k4UrfBRUAelEjmKgV05jwD2ymzcyf Ltoo5mkZOZR1FAZJwbpz75Tc657Y9Xl2+MbyKvWwSLFth+SJGaxigE6xOaraFHtGah0dJb+AG0Hy A4ZlMk8Mo3aR7xX8OzI6UVbQKtrayH5RxslUIw==',
}, (profile, done) => {
  return done(null, profile);
}));

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const username = req.user.nameID; // Replace with your variable
    res.render('home', { username });
  } else {
    res.render('login');
  }
});

app.get('/login', passport.authenticate('saml'));

app.post('/login/callback', passport.authenticate('saml', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  res.redirect('/');
});

app.get('/logout', (req, res) => {

    req.session.regenerate((err) => {
        if (err) {
          console.log(err);
        } else {
          req.session.destroy((err) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect('/');
            }
          });
        }
      });
   
});

app.listen(3000,() => {
  console.log('Server started on port 3000');
});
