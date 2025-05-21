
#  Vehicle Selection App

This is a Next.js application designed to allow users to select a vehicle based on its manufacturer, model, and type. The selected details are then displayed on the screen.

## Local Setup and Running the Application

To set up and run this project locally, follow these steps:

1.  **Prerequisites:**
    *   Ensure you have [Node.js](https://nodejs.org/) installed (which includes npm). Version 18.x or later is recommended.

2.  **Clone the Repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

3.  **Install Dependencies:**
    Open your terminal in the project's root directory and run:
    ```bash
    npm install
    ```
    This command will download and install all the necessary packages defined in `package.json`.

4.  **Run the Development Server:**
    Once the dependencies are installed, start the Next.js development server:
    ```bash
    npm run dev
    ```
    This will start the application, typically on `http://localhost:9002` (as configured in `package.json`). Open this URL in your web browser to see the application.

    The app will automatically reload if you make changes to the code.

## Project Structure and Key Components

This application follows a standard Next.js (App Router) project structure. Here's a breakdown of the key parts:

### 1. Main Page (`src/app/page.tsx`)

*   **Purpose**: This is the primary page users see when they visit the application.
*   **Functionality**:
    *   Sets up the main layout for the vehicle selection interface.
    *   Renders a header with the title "Vehicle Selection".
    *   Includes the core `VehicleSelector` component.
    *   Includes the `Toaster` component for notifications (though currently, direct toast notifications from `vehicle-selector` have been replaced by the "Your selection" card).

### 2. Root Layout (`src/app/layout.tsx`)

*   **Purpose**: Defines the root HTML structure for all pages in the application.
*   **Functionality**:
    *   Sets up the HTML lang, body, and applies global fonts (Geist Sans).
    *   Includes global CSS (`./globals.css`).
    *   Provides metadata like the page title ("Vehicle Selection") and description.
    *   Renders the `Toaster` component from `shadcn/ui` to handle app-wide toast notifications if used.

### 3. Vehicle Selector Component (`src/components/vehicle-selector.tsx`)

This is the heart of the application.

*   **Purpose**: Provides the user interface for selecting vehicle manufacturer, model, and type, and displays the confirmed selection.
*   **Functionality**:
    *   **State Management**: Uses `useState` and `useEffect` hooks to manage:
        *   `selectedManufacturer`: The currently selected manufacturer name.
        *   `selectedModel`: The currently selected model name.
        *   `selectedType`: The currently selected type name.
        *   `confirmedDetails`: An object holding the details of the confirmed selection (manufacturer, model, type, power, cubicCapacity) or `null` if no selection is confirmed.
    *   **Data Loading**:
        *   Imports `manufacturersData`, `modelsData`, and `typesData` from `src/lib/vehicle-data.ts`.
        *   Uses `useMemo` to sort the manufacturer, model, and type lists alphabetically for display in the dropdowns. Each item uses its unique `code` for the `key` prop and `name` for the `value` and display.
    *   **Dropdowns (ShadCN `Select` component)**:
        *   **Manufacturer Dropdown**: Populated with data from `manufacturersData`. Placeholder: "-- Select Manufacturer --".
        *   **Model Dropdown**: Populated with all models from `modelsData`. Disabled until a manufacturer is selected. Placeholder: "-- Select Model --".
        *   **Type Dropdown**: Populated with all types from `typesData`. Disabled until a model is selected. Placeholder: "-- Select Type --".
    *   **"OK" Button**:
        *   Enabled only when all three selections (manufacturer, model, type) are made.
        *   On click (`handleConfirm`), it populates the `confirmedDetails` state with the chosen vehicle's properties.
    *   **"RESET" Button**:
        *   On click (`handleReset`), it explicitly clears all selections by setting `selectedManufacturer`, `selectedModel`, `selectedType` to `undefined`, and `confirmedDetails` to `null`. This returns the form to its initial state, displaying placeholders in dropdowns and re-disabling dependent dropdowns as expected.
    *   **"Your selection" Card**:
        *   A `Card` component that becomes visible only after a selection is confirmed (i.e., `confirmedDetails` is not `null`).
        *   Displays the Manufacturer Name, Model Name, Power, and Cubic Capacity of the selected vehicle. "Power" and "Cubic Capacity" are taken from the selected type's data if available, otherwise "N/A" is shown.
        *   Features a subtle fade-in animation (`animate-in fade-in-0 duration-500 ease-out`) when it appears.
    *   **Dynamic Updates**: `useEffect` hooks are used to:
        *   Reset `selectedModel` and `selectedType` if `selectedManufacturer` changes.
        *   Reset `selectedType` if `selectedModel` changes.
        *   Clear `confirmedDetails` if any of the primary selections (`selectedManufacturer`, `selectedModel`, `selectedType`) change before a new confirmation.

### 4. Vehicle Data Handling (`src/lib/vehicle-data.ts`)

*   **Purpose**: Acts as a central point for accessing the vehicle data.
*   **Functionality**:
    *   Imports raw JSON data from `manufacturers.json`, `models.json`, and `types.json` located in the `src/data/` directory.
    *   Exports these data arrays (`manufacturersData`, `modelsData`, `typesData`) for use in other components, primarily `VehicleSelector`.
    *   Defines TypeScript interfaces (`ManufacturerEntry`, `ModelEntry`, `TypeEntry`) for type safety when working with this data.

### 5. Data Fixtures (`src/data/`)

*   **`manufacturers.json`**: Contains a list of vehicle manufacturers, each with a `code` and `name`.
*   **`models.json`**: Contains a list of vehicle models, each with a `code`, `name`, and optional build date information.
*   **`types.json`**: Contains a list of vehicle types, each with a `code`, `name`, and optional properties like `power`, `cubicCapacity`, `fuel`, etc.

    *   **Note**: As per requirements, the application loads *all* models and *all* types from these files into their respective dropdowns, without filtering based on the selected manufacturer. This is due to the current structure of the JSON data and the explicit instruction to use all data in the files.

### 6. Global Styles and Theme (`src/app/globals.css`)

*   **Purpose**: Defines global CSS styles and the application's theme using CSS custom properties (variables) for ShadCN UI.
*   **Functionality**:
    *   Imports Tailwind CSS base, components, and utilities.
    *   Sets up the HSL color variables for `--background`, `--foreground`, `--primary`, `--secondary`, `--accent`, etc., which define the app's color scheme (light and dark modes).
    *   The primary color for interactive elements like the "OK" button is defined by `--primary`.
    *   The background color is defined by `--background`.
    *   Applies base styles to `body` and other elements.

## Accessibility (A11y)

The application incorporates several accessibility best practices:
*   Semantic HTML elements are used where appropriate (e.g., `<main>`, `<header>`, `<button>`).
*   `Label` components are correctly associated with their form controls (`Select` components) using `htmlFor` and `id` attributes, ensuring screen readers can announce the purpose of each control.
*   Interactive elements like buttons have clear text or `aria-label` attributes (e.g., the "OK" button has `aria-label="Confirm selection"`).
*   Disabled states are visually and programmatically applied to controls when they are not interactive, preventing user interaction and communicating the state to assistive technologies.
*   The ShadCN UI components used are generally designed with accessibility in mind, including keyboard navigation and ARIA attribute usage.
*   The "Your selection" card appears as a direct result of user action and its content is structured semantically, making it accessible. The fade-in animation is purely visual and does not impede accessibility.

This guide should help developers understand the structure, setup, and functionality of the Vehicle Selection application.
