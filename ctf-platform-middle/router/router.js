const Router = require('koa-router');
const login = require('../apis/postLogin');
const logout = require('../apis/getLogout');
const register = require('../apis/postRegister');
const getChallenges = require('../apis/getChallenges');
const postSubmit = require('../apis/postSubmit');
const team = require('../apis/getTeamInfo');
const markdown = require('../apis/getNotice');

const router = new Router();

router.post('/login', login);
router.post('/register', register);
router.post('/submit', postSubmit);

router.get('/logout', logout);
router.get('/challenges', getChallenges);
router.get('/team', team);
router.get('/index', markdown);

module.exports = router;