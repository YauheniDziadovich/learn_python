const core = require('@actions/core');

async function run() {
  try {
    const name = core.getInput('name');
    const greeting = core.getInput('greeting') || 'Hello';
    console.log(`${greeting}, ${name}!`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

