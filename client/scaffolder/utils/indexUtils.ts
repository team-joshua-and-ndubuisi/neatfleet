// utils/indexUtils.ts
import fs from 'fs';
import path from 'path';

/**
 * Updates or creates an index.ts file in the specified directory to export all modules within that directory.
 * Handles both named and default exports and can be run recursively to create index files in subdirectories.
 * @param dirPath - The directory path where the index.ts file should be updated or created.
 * @param isRecursive - Whether to create index files in subdirectories as well.
 */
export const updateIndexFile = (dirPath: string, isRecursive = false): void => {
  const indexFilePath = path.join(dirPath, 'index.ts');
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const exportStatements: string[] = [];

  for (const entry of entries) {
    if (entry.name === 'index.ts') continue; // Skip existing index.ts files

    const fullPath = path.join(dirPath, entry.name);
    const fileName = path.parse(entry.name).name;
    const importPath = `./${fileName}`;

    if (entry.isDirectory()) {
      if (isRecursive) {
        // Recursively update index.ts files for subdirectories
        updateIndexFile(fullPath, isRecursive);
      }
      exportStatements.push(`export * from '${importPath}';`);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))
    ) {
      // Read the file contents to detect export types
      const fileContent = fs.readFileSync(fullPath, 'utf-8');

      const hasDefaultExport = /export\s+default/.test(fileContent);
      const hasNamedExports =
        /export\s+(const|let|function|class|interface|{)/.test(fileContent);

      if (hasDefaultExport && hasNamedExports) {
        // Handle both default and named exports
        exportStatements.push(
          `export { default as ${fileName} } from '${importPath}';`
        );
        exportStatements.push(`export * from '${importPath}';`);
      } else if (hasDefaultExport) {
        // Handle only default export
        exportStatements.push(
          `export { default as ${fileName} } from '${importPath}';`
        );
      } else if (hasNamedExports) {
        // Handle only named exports
        exportStatements.push(`export * from '${importPath}';`);
      }
    }
  }

  // Write the generated export statements to index.ts
  fs.writeFileSync(indexFilePath, exportStatements.join('\n'), 'utf-8');
  console.log(`Updated index file at ${indexFilePath}`);
};
