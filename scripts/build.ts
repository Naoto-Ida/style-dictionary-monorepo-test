import StyleDictionary from 'style-dictionary';

StyleDictionary.registerFormat({
  name: 'css/components',
  formatter: ({ dictionary, platform, options }) => {
    const cssArr: Record<string, string[]> = {};
    const lineSeparator = '\n';
    const { component } = dictionary.properties;

    const isNotNestedToken = (
      token: any
    ): token is StyleDictionary.TransformedToken => !!token.name;

    for (const componentName of Object.keys(component)) {
      const cmp = component[componentName];

      for (const propertyName of Object.keys(cmp)) {
        const property:
          | StyleDictionary.TransformedToken
          | StyleDictionary.TransformedTokens = cmp[propertyName];

        // TODO: Handle when it IS nested
        if (isNotNestedToken(property)) {
          const reference = dictionary.getReferences(property.original.value);
          const cssKey = `.${platform.prefix}-component-${componentName}`;

          if (reference.length === 1) {
            if (!cssArr[cssKey]) {
              cssArr[cssKey] = [];
            }

            if (options.outputReferences) {
              cssArr[cssKey].push(
                `  ${propertyName}: var(--${reference[0].name})`
              );
            } else {
              cssArr[cssKey].push(`  ${propertyName}: ${reference[0].value}`);
            }
          }
        }
      }
    }

    return Object.keys(cssArr)
      .map((cssClass) => {
        const c = cssArr[cssClass];

        return `${cssClass} {${lineSeparator}${c.join(
          ';' + lineSeparator
        )};${lineSeparator}}`;
      })
      .join(lineSeparator);
  },
})
  .extend('style-dictionary.json')
  .buildAllPlatforms();
