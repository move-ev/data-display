# data-display

> Sample implementation of [`@tanstack/react-table`](https://tanstack.com/table/latest) for a data list using [`shadcn/ui`](https://ui.shadcn.com/).

This minimal data-display demo shows how `@tanstack/react-table` can be used to display data in a list with grouping, sorting, and filtering. The Demo is compatible with `shadcn/ui` and `base-ui`.

The demo contains the following functionalities:

- Grouping
    - Expanding and collapsing groups
- Sorting
- Column visibility
- Different layout options (compact, default, loose)

ToDo: Implement filtering and selection actions, pagination, and more.

## How it works

Instead of using the default `table` component, we use a custom `List` component. The `List` component is a wrapper around the `ul` element and adds a few extra features:

- `data-layout` attribute to set the layout of the list
- `data-slot` attribute to set the slot of the list item
- `data-collapsed` attribute to set the collapsed state of the list item
- `data-selected` attribute to set the selected state of the list item
- `data-checked` attribute to set the checked state of the list item
- `data-expanded` attribute to set the expanded state of the list item

We then create a custom `DataList` component for each Data List. The `DataList` component is a wrapper around the `List` component and combines the `List` component with the `@tanstack/react-table` component. We use the `DataDisplayOptions` component to display the options for the Data List like grouping, sorting, and column visibility.

