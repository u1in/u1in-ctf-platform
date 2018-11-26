const Router = require('koa-router');

const addChallenge = require('../apis/_postAddChallenge');

const login = require('../apis/postLogin');
const register = require('../apis/postRegister');
const getChallenges = require('../apis/getChallenges');
const getUsers = require('../apis/postUsers');
const addSubmit = require('../apis/postAddSubmit');
const getSubmit = require('../apis/postGetSubmit');
const updateChallenge = require('../apis/postUpdateChallenge')

const router = new Router();

router.post('/addChallenge', addChallenge);

router.post('/login', login);
router.post('/register', register);
router.post('/getUsers', getUsers);
router.post('/addSubmit', addSubmit);
router.post('/getSubmit', getSubmit)
router.post('/updateChallenge', updateChallenge);
router.get('/getChallenges', getChallenges);

module.exports = router;