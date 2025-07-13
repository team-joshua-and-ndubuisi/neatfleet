export const typesTemplate = (
  TypeInterfaceName: string,
  typeProperties: string,
  StateInterfaceName?: string,
  stateProperties?: string
): string => {
  let template = `export interface ${TypeInterfaceName} {
  ${typeProperties}
}
`;

  if (StateInterfaceName && stateProperties) {
    template += `
export interface ${StateInterfaceName} {
  ${stateProperties}
}
`;
  }

  return template;
};
