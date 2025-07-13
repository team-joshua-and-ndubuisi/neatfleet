import inquirer from 'inquirer';
import fuzzyPath from 'inquirer-fuzzy-path';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { highlight } from 'cli-highlight';

// Register the fuzzy-path prompt
inquirer.registerPrompt('fuzzy-path', fuzzyPath);

// Consistent display for static messages like headers
export const showHeader = (scriptName: string) => {
  const headerMessage = `*** Starting ${scriptName} ***`;
  console.log(chalk.bgBlue.white.bold(`\n${headerMessage}\n`));
};

// Prompt the user with a general text input
export const askQuestion = async (question: string): Promise<string> => {
  const { answer } = await inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: chalk.cyan(question),
    },
  ]);
  return answer.trim();
};

// Confirm an action with a yes/no prompt
export const askConfirmation = async (question: string): Promise<boolean> => {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: chalk.yellow(question),
    },
  ]);
  return confirm;
};

// Validate non-empty input, with validation to prevent empty answers
export const requireNonEmpty = async (question: string): Promise<string> => {
  const { answer } = await inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: chalk.cyan(question),
      validate: (input) => input.trim() !== '' || 'This field cannot be empty.',
    },
  ]);
  return answer.trim();
};

// Directory selection with fuzzy-path
export const askForDirectory = async (question: string): Promise<string> => {
  // Resolve and validate `src` directory
  const srcPath = path.resolve(process.cwd(), 'src');
  if (!fs.existsSync(srcPath) || !fs.lstatSync(srcPath).isDirectory()) {
    throw new Error(`The "src" directory does not exist at ${srcPath}`);
  }

  const { directory } = await inquirer.prompt([
    {
      type: 'fuzzy-path',
      name: 'directory',
      message: chalk.cyan(question),
      rootPath: srcPath, // Base path for fuzzy search
      itemType: 'directory', // Restrict to directories only
      suggestOnly: true, // Allow appending input
      depthLimit: 5, // Limit to 5 levels deep
      default: '', // Start with an empty input
      // Modify the list of directories after fetching
      async source(_, input = '') {
        const fullPath = path.join(srcPath, input);
        const dirs = fs
          .readdirSync(fullPath, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => path.join(input, dirent.name));

        // Manually return relative paths without the root `src` prefix
        return dirs.map((dir) =>
          path.relative(srcPath, path.resolve(srcPath, dir))
        );
      },
    },
  ]);

  return directory; // Return the directory relative to `src`
};

// Show messages to the user, color-coded for type
export const showMessage = (
  message: string,
  type: 'info' | 'success' | 'error' = 'info'
) => {
  const colorizedMessage =
    type === 'info'
      ? chalk.blueBright(`[INFO] ${message}`)
      : type === 'success'
      ? chalk.green(`[SUCCESS] ${message}`)
      : chalk.red(`[ERROR] ${message}`);
  console.log(colorizedMessage);
};

/**
 * Highlights TypeScript code and prints it to the console.
 *
 * @param code - The TypeScript code to preview.
 */
export function previewCode(code: string): void {
  const highlightedCode = highlight(code, {
    language: 'typescript',
    ignoreIllegals: true,
  });
  console.log(highlightedCode);
}

// Close the readline interface (no longer needed when using `inquirer`)
export const closeCLI = () => process.exit(0);
