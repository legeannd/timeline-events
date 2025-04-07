# Timeline Component with Tailwind CSS

This is an interactive timeline component that arranges items in horizontal lanes, optimizing space usage while maintaining readability. The component is styled with Tailwind CSS for a clean, modern look.

## Features

- **Compact Layout**: Items are arranged in lanes, with items sharing lanes when possible to save vertical space.
- **Zooming**: Users can zoom in and out to see more or less detail.
- **Inline Editing**: Double-click on an item's name to edit it inline.
- **Month Headers**: Clear month/year labels to help with date orientation.
- **Color Coding**: Items are color-coded for better visual distinction.

## What I Like About This Implementation

- The timeline is highly interactive, allowing users to manipulate data directly.
- Using Tailwind CSS makes the styling more maintainable and consistent.
- The code is modular and the design is responsive across different screen sizes.
- The use of React hooks like `useMemo` optimizes performance by preventing unnecessary recalculations.

## What I Would Change

- Add more robust validation for date changes.
- Add drag options to each event.
- Change the layout to make it responsive to more screen sizes.
- Add filtering and grouping options for larger datasets.
- Add keyboard accessibility for all interactive elements.
- Create more customization options for the theme and appearance.

## Design Decisions

I was inspired by Google Calendar's timeline view, specially the use of different colors to different events.

I prioritized:
1. **Usability**: Making it easy to view and understand the timeline data
2. **Interactivity**: Allowing users to manipulate data directly in the timeline
3. **Performance**: Using memoization to handle potentially large datasets efficiently
4. **Aesthetics**: Clean design using Tailwind CSS for consistent styling

## Testing Approach

If I had more time, I would implement the following tests:

1. **Unit Tests**:
   - Test the `assignLanes` function with various input scenarios
   - Test date calculations and formatting
   - Test item positioning logic

2. **Integration Tests**:
   - Test zooming functionality
   - Test drag-and-drop behavior
   - Test inline editing

3. **Accessibility Tests**:
   - Test keyboard navigation
   - Test screen reader compatibility
   - Test color contrast for accessibility

## Running the Project

1. Navigate to the project directory
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. The project URL will be opened after
