const { getGitUserEmail, getGitUserName, isAGitRepo } = require('../git')

test('Should be able to get current user', async () => {

  const userName = await getGitUserName()
  expect(userName).not.toBeUndefined()

  const userEmail = await getGitUserEmail()
  expect(userEmail).not.toBeUndefined()
})

test('Should be a git repo', async () => {
  const is = await isAGitRepo()
  
  expect(is).toBe(true)
})
