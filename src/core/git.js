const { exec } = require("child_process")
const { lstat } = require("fs/promises")
const { join } = require("path")
const { getBaseDir } = require("./fs")

const asyncExec = async cmd => await new Promise((resolve, reject) => exec(cmd, (err, stdout) => {
  if (err) {
    return reject(err)
  }

  resolve(stdout.trim())
}))

const isAGitRepo = async () => {
  const gitPath = join(getBaseDir(), '..', '.git')
  const stat = await lstat(gitPath)

  return stat.isDirectory()
}

const getGitUserName = async () => await asyncExec(`git config user.name`)

const getGitUserEmail = async () => await asyncExec(`git config user.email`)

const getCurrentBranchName = async () => await asyncExec(`git branch --show-current`)

module.exports = {
  isAGitRepo,
  getGitUserName,
  getGitUserEmail,
  getCurrentBranchName,
}
