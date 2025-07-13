import pluralize from 'pluralize';

export interface FeatureNamesType {
  original: string;
  singularCamel: string;
  SingularPascal: string;
  pluralCamel: string;
  PluralPascal: string;
}

export const generateFeatureNames = (featureName: string): FeatureNamesType => {
  const singular = pluralize.singular(featureName);
  const plural = pluralize.plural(featureName);

  return {
    original: featureName,
    singularCamel: singular.charAt(0).toLowerCase() + singular.slice(1),
    SingularPascal: singular.charAt(0).toUpperCase() + singular.slice(1),
    pluralCamel: plural.charAt(0).toLowerCase() + plural.slice(1),
    PluralPascal: plural.charAt(0).toUpperCase() + plural.slice(1),
  };
};
