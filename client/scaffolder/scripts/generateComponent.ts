import {
  closeCLI,
  createFileWithDirectories,
  getFullPath,
  updateIndexFile,
  FeatureNamesType,
  generateFeatureNames,
  showHeader,
  requireNonEmpty,
  askConfirmation,
  previewCode,
} from '../utils';

import { componentTemplate } from '../templates';

export const generateComponent = async (
  location?: string,
  featureNamesDict?: FeatureNamesType
) => {
  showHeader('Component Generation');

  if (!location) {
    location = await requireNonEmpty(
      'Enter the location directory for the component file:'
    );
  }

  if (!featureNamesDict) {
    const featureName = await requireNonEmpty(
      'Enter the feature name (e.g., "posts"):'
    );
    featureNamesDict = generateFeatureNames(featureName);
  }

  let addAnotherComponent = true;

  while (addAnotherComponent) {
    let componentName = `${featureNamesDict.PluralPascal}`;

    const componentNameConfirmed = await askConfirmation(
      `Should the component name be ${componentName}?`
    );

    if (!componentNameConfirmed) {
      componentName = await requireNonEmpty('Enter a new component name:');
    }

    const hasProps = await askConfirmation('Does this component have props?');
    const props: string[] = [];
    if (hasProps) {
      let addAnotherProp = true;
      while (addAnotherProp) {
        const propName = await requireNonEmpty('Enter the name of a prop:');
        const propType = await requireNonEmpty(
          `Enter the type for "${propName}":`
        );
        props.push(`${propName}?: ${propType};`);
        addAnotherProp = await askConfirmation('Add another prop?');
      }
    }

    const hasTypes = await askConfirmation('Does this component use types?');
    const types: string[] = [];
    if (hasTypes) {
      let addAnotherType = true;
      while (addAnotherType) {
        const typeName = await requireNonEmpty('Enter the name of a type:');
        types.push(typeName);
        addAnotherType = await askConfirmation('Add another type?');
      }
    }

    const usesHook = await askConfirmation('Does this component use a hook?');
    const hookImports: string[] = [];
    if (usesHook) {
      let addAnotherHook = true;
      while (addAnotherHook) {
        const hookName = await requireNonEmpty('Enter the name of the hook:');
        hookImports.push(hookName);
        addAnotherHook = await askConfirmation('Add another hook?');
      }
    }

    const componentContent = componentTemplate(
      componentName,
      props,
      types,
      hookImports
    );

    const filePath = getFullPath(location, `${componentName}.tsx`);

    // Print generated template
    previewCode(componentContent);

    // Confirm type file creation
    const confirmType = await askConfirmation(
      `Generate component ${componentName} for feature '${featureNamesDict.original}' in ${location}?`
    );

    if (!confirmType) {
      console.log('Type generation canceled.');
      closeCLI();
      return;
    }

    createFileWithDirectories(filePath, componentContent);
    console.log(
      `Component file for ${featureNamesDict.original} created at ${filePath}`
    );

    updateIndexFile(location);
    console.log(`Updated index.ts file in ${location}`);

    addAnotherComponent = await askConfirmation('Create another component?');
  }
};

// Check if the module is running directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  (async () => {
    try {
      // Parse CLI arguments for location and feature name, if provided
      const [, , locationArg, featureNameArg] = process.argv;
      const location = locationArg ? locationArg : undefined;
      const featureNamesDict = featureNameArg
        ? generateFeatureNames(featureNameArg)
        : undefined;

      // Run generateComponent with optional prompts for missing arguments
      await generateComponent(location, featureNamesDict);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      closeCLI();
    }
  })();
}
