workflow "Build, test and publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Install dependencies" {
  uses = "actions/npm@main"
  args = "install"
}

action "Test" {
  uses = "actions/npm@main"
  args = "run test"
  needs = ["Install dependencies"]
}
