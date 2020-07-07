const router = require('koa-router')()
const { 
  login
} = require('../controller/user')
const { SuccessModel, ErroModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
      // 设置 session
      ctx.session.username = data.username
      ctx.session.realname = data.realname
      // express-session 会直接同步到 redis
      ctx.body = new SuccessModel()
      return
  }
  ctx.body = new ErroModel('登录失败')
})

// 验证 redis 是否可以使用
router.get('/session-test', async function (ctx, next) {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount++
  ctx.body = {
      errno: 0,
      viewCount: ctx.session.viewCount
  }
})

module.exports = router
