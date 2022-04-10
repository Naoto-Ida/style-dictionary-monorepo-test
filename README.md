# style-dictionary-monorepo-test

A concept repo utilizing StyleDictionary in a monorepo context.

## Requirements

- Targets "web" platform; web platform requires (S)CSS and JS.
- Tokens consist of "levels"; global, semantic, component.
- S(CSS) must represent these concepts using CSS variables.
- JS must export single values for global & semantic, but an object for component.

## TODO

- The `component` object can be a `StyleDictionary.TransformedToken` or `StyledDictionary.TransformedTokens`. We need to handle cases where its `StyledDictionary.TransformedTokens`.
