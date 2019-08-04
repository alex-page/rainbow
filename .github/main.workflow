workflow "Build, test and publish on master" {
  on = "push"
  resolves = ["Publish"]
}

action "Install dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  uses = "actions/npm@master"
  args = "run test"
  needs = ["Install dependencies"]
}
