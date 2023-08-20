const { existsSync } = require('fs');

try {
  if (existsSync('.git')) {
    require('husky').install()
  }
} catch (err) {
  // ignore errors on husky install
}