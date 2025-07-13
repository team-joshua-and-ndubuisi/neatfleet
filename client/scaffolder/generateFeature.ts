import {
  createDirectory,
  getFullPath,
  updateIndexFile,
  generateFeatureNames,
  requireNonEmpty,
  askConfirmation,
  showMessage,
  closeCLI,
} from './utils';

import {
  generateType,
  generateSlice,
  generateApi,
  generateComponent,
} from './scripts';

const generateFeature = async () => {
  try {
    // Prompt for feature name
    const featureName = await requireNonEmpty(
      'Enter the name of the feature (e.g., "posts"):'
    );

    // Create dictionary of feature names
    const featureNamesDict = generateFeatureNames(featureName);

    // Prompt for additional configurations
    const createType = await askConfirmation('Will this feature need a type?');
    const createApi = await askConfirmation(
      'Will this feature be making API requests?'
    );
    const createSlice = await askConfirmation(
      'Does this feature need a slice of state from the store?'
    );
    const createComponent = await askConfirmation(
      'Does this feature need components?'
    );

    // Define base directory path for the feature
    const baseDir = getFullPath('src/features', featureNamesDict.original);
    createDirectory(baseDir);

    if (createType) {
      // Generate types file and update index
      const typesDir = `${baseDir}/types`;
      await generateType(typesDir, featureNamesDict);
    }

    // Generate API file if requested and update index
    if (createApi) {
      const apiDir = `${baseDir}/api`;
      await generateApi(apiDir, featureNamesDict);
      showMessage(
        `API module created for ${featureNamesDict.original}.`,
        'success'
      );
    }

    // Generate slice file if requested and update index
    if (createSlice) {
      const slicesDir = `${baseDir}/slices`;
      await generateSlice(slicesDir, featureNamesDict);
      showMessage(
        `Redux slice created for ${featureNamesDict.original}.`,
        'success'
      );
    }

    // Generate component file and update index
    if (createComponent) {
      const componentsDir = `${baseDir}/components`;
      await generateComponent(componentsDir, featureNamesDict);
      showMessage(
        `Component created for ${featureNamesDict.original}.`,
        'success'
      );
    }

    // Generate feature-level index.ts after creating subdirectories and files
    updateIndexFile(baseDir, true); // `true` enables recursive indexing
    showMessage(
      `Feature '${featureNamesDict.original}' created successfully at ${baseDir}`,
      'success'
    );
  } catch (error) {
    showMessage(`Error generating feature: ${error}`, 'error');
  } finally {
    closeCLI();
  }
};

// Start the feature generation process
generateFeature();
