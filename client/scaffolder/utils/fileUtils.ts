import fs from 'fs';
import path from 'path';

/**
 * Create a directory if it doesn't already exist.
 * @param dirPath - The path of the directory to create.
 */
export const createDirectory = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

/**
 * Write content to a file. Creates the file if it doesn't exist.
 * @param filePath - The path of the file to write to.
 * @param content - The content to write to the file.
 */
export const writeFile = (filePath: string, content: string): void => {
  fs.writeFileSync(filePath, content);
  console.log(`Created file: ${filePath}`);
};

/**
 * Get the full path for a given base directory and a relative path.
 * @param baseDir - The base directory.
 * @param relativePath - The relative path to resolve against the base directory.
 * @returns The full path.
 */
export const getFullPath = (baseDir: string, relativePath: string): string => {
  return path.join(baseDir, relativePath);
};

/**
 * Create a file and its parent directories if they do not exist.
 * @param filePath - The full path of the file to create.
 * @param content - The content to write to the file.
 */
export const createFileWithDirectories = (
  filePath: string,
  content: string
): void => {
  const dirPath = path.dirname(filePath);
  createDirectory(dirPath); // Ensure the directory exists
  writeFile(filePath, content); // Write the file
};

/**
 * Replace the last directory in a given path with a new directory.
 * @param urlPath - The original path.
 * @param newDirectory - The new directory to append.
 * @returns The updated path.
 */
export const replaceLastDirectory = (
  urlPath: string,
  newDirectory: string
): string => {
  const dirPath = path.dirname(urlPath); // Get the directory path without the last segment
  return path.join(dirPath, newDirectory); // Append the new directory
};

/**
 * Add a reducer to a Redux combineReducers call in a file.
 * @param filePath - The path of the file to modify.
 * @param reducerName - The name of the new reducer (e.g., 'todoSlice').
 * @param importPath - The import path for the reducer (e.g., '~/features/todo').
 */
export const addReducerToFile = (
  filePath: string,
  reducerName: string,
  importPath: string
): void => {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Check if the reducer is already in the file
  if (fileContent.includes(reducerName)) {
    console.log(`Reducer "${reducerName}" already exists in ${filePath}`);
    return;
  }

  // Add the import for the new reducer
  const importStatement = `import { ${reducerName} } from '${importPath}';\n`;
  const updatedImports = fileContent.replace(
    /^(import .+\n)+/,
    (match) => match + importStatement
  );

  // Update the combineReducers call
  const combineReducersRegex = /combineReducers\(\{\s*([\s\S]*?)\}\)/;
  const match = updatedImports.match(combineReducersRegex);

  if (!match) {
    console.error(`Could not find combineReducers call in ${filePath}`);
    return;
  }

  const currentReducers = match[1].trim();
  const newReducers = `${currentReducers}
  ${reducerName}: ${reducerName},`;

  const updatedContent = updatedImports.replace(
    combineReducersRegex,
    `combineReducers({ ${newReducers} })`
  );

  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
  console.log(`Added reducer "${reducerName}" to ${filePath}`);
};
