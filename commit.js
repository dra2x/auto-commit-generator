const { execSync } = require('child_process');
const fs = require('fs');
const { format, eachDayOfInterval, parseISO } = require('date-fns');

if (!fs.existsSync('daily.json')) {
  console.error('Error: daily.json file not found.');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync('daily.json', 'utf8'));

const gitUserName = config.gitUserName;
const gitUserEmail = config.gitUserEmail;
const minCommitCount = config.minCommitCount;
const maxCommitCount = config.maxCommitCount;
const commitMessage = config.commitMessage;

const getRandomCommitCount = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const commitCount = getRandomCommitCount(minCommitCount, maxCommitCount);

const exec = (command) => {
  console.log(`Running: ${command}`);
  return execSync(command, { stdio: 'inherit' });
};

const createCommits = (count, message) => {
  fs.writeFileSync('commit_file.txt', '');

  for (let i = 1; i <= count; i++) {
    exec(`echo "Commit number ${i} at $(date)" >> commit_file.txt`);
    exec('git add commit_file.txt');
    exec(`git commit -m "${message} ${i}"`);
  }
};

const pushChanges = () => {
  exec(`git push https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git main`);
};

const backdatingConfig = fs.existsSync('backdate.json') ? JSON.parse(fs.readFileSync('backdate.json', 'utf8')) : {};

const backdateCommits = () => {
  const startDate = parseISO(backdatingConfig.startDate);
  const endDate = parseISO(backdatingConfig.endDate);
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  for (const date of dates) {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const commitCount = getRandomCommitCount(backdatingConfig.minCommitCount, backdatingConfig.maxCommitCount);

    for (let i = 1; i <= commitCount; i++) {
      exec(`GIT_AUTHOR_DATE="${formattedDate}T00:00:00" GIT_COMMITTER_DATE="${formattedDate}T00:00:00" git commit --allow-empty -m "${commitMessage} ${i}"`);
    }
  }
};

const run = () => {
  exec(`git config user.name "${gitUserName}"`);
  exec(`git config user.email "${gitUserEmail}"`);
  createCommits(commitCount, commitMessage);
  backdateCommits();
  pushChanges();
};

run();
