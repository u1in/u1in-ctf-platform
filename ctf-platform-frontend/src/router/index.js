import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Challenges from '@/pages/challenges'
import Scoreboard from '@/pages/scoreboard'
import Team from '@/pages/team'
import Login from '@/pages/login'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    }, {
      path: '/index',
      name: 'Index',
      component: Index,
    }, {
      path: '/challenges',
      name: 'Challenges',
      component: Challenges,
    }, {
      path: '/scoreboard',
      name: 'Scoreboard',
      component: Scoreboard,
    }, {
      path: '/team/:id',
      name: 'Team',
      component: Team,
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ]
})

router.beforeEach((to, from, next) => {
  let teamId = localStorage.getItem('userid');
  let needIdList = ['Challenges', 'Team', 'Scoreboard', null];
  if (needIdList.indexOf(to.name) > -1) {
    if (teamId === null) {
      next({
        path: '/login',
      })
    }
    else {
      next();
    }
  }
  else {
    if (to.name === 'Login' && teamId != null) {
      next({
        path: '/challenges',
      })
    }
    else {
      next();
    }
  }
})

export default router;
