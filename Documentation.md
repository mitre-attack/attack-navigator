Sure, here is the detailed code documentation formatted for inclusion in your README:

---

## Detailed Code Documentation

### Python Scripts and Server

#### `main.py`
The `main.py` script processes data from an Excel file and generates layer files used by the Navigator.

**Key Functions:**
- **`technologyDCgetter(excelFile)`**: Reads technology coverage data from the Excel file.
- **`bedrijfTotechnology(excelFile)`**: Reads company to technology mapping from the Excel file.
- **`calculate_coverage(tech_coverage, tech_list)`**: Calculates data component coverage by technologies.
- **`is_techniek_gedekt(data_sources, coverage)`**: Determines if a technique is covered based on data sources and coverage.
- **`read_json(fileName)`**: Reads JSON files.
- **`read_yaml(file_path)`**: Reads YAML files.
- **`normalize_name(name)`**: Normalizes company names.
- **`main()`**: Orchestrates data processing and file generation.

**Process Description:**
1. **Preparation and Input**:
    - **Excel File**: Reads technology coverage and company technology mapping from an Excel file using `technologyDCgetter` and `bedrijfTotechnology`.
    - **ATT&CK Data**: Fetches and processes ATT&CK data.
    - **Configuration Files**: Reads customer data and layer template from YAML and JSON files.

2. **Data Processing**:
    - **Coverage Calculation**: Uses `calculate_coverage` to determine the coverage of data components by technologies.
    - **Layer File Generation**: Creates layer files based on the processed data and customer information.

3. **Output**:
    - **Layer Files**: Saves the generated layer files in `nav-app/src/app/layerfiles`.

#### `server.py`
The `server.py` script provides a Flask-based web server to handle API requests for layer files and threat data.

**Key Endpoints:**
- **`/api/layers`**: Lists available layer files.
    - **Method**: GET
    - **Response**: JSON list of layer files.

- **`/api/layers/<filename>`**: Retrieves a specific layer file.
    - **Method**: GET
    - **Response**: The requested layer file.

- **`/get_tds_data`**: Processes and retrieves threat data for a specified company.
    - **Method**: POST
    - **Request Body**: JSON with `companyName`, `sectors`, and `geographies`.
    - **Response**: JSON object with threat data.

**Helper Functions:**
- **`list_layers()`**: Lists all available layer files in the specified directory.
- **`get_layer(filename)`**: Retrieves a specific layer file.
- **`get_tds_data(companyName, sectors, geographies)`**: Processes threat data and calculates coverage for a specified company.
- **`handle_request()`**: Handles POST requests to `/get_tds_data`.

**Process Description:**
1. **Layer File Handling**:
    - Lists available layer files in the specified directory.
    - Retrieves specific layer files on request.

2. **Threat Data Processing**:
    - Processes threat data for a specified company based on sectors and geographies.
    - Calculates data component coverage and identifies technologies that can enhance coverage.

**Server Setup**:
- The Flask server runs on port 3001 and enables CORS for cross-origin requests.

### Angular Components

#### `MyChartComponent`
This component handles chart visualizations for the Navigator.

**Key Methods:**
- **`ngOnInit()`**: Initializes the component and loads chart data.
- **`loadChartData()`**: Loads data for the selected company and updates the chart.
- **`generateColorScheme(data)`**: Generates color schemes for the chart.
- **`onCategorySelect(event)`**: Handles category selection and updates chart data.
- **`onCompanyChange(newCompany)`**: Updates data when a different company is selected.
- **`updateChartData(data)`**: Updates chart data with averages for main categories.
- **`updateChartSize()`**: Dynamically adjusts chart size based on window size.

#### `DCcoverageTableComponent`
This component displays a table of data component coverage.

**Key Methods:**
- **`ngOnInit()`**: Loads initial data for the component.
- **`ngAfterViewInit()`**: Sets up table sorting.
- **`loadInitialData()`**: Subscribes to shared data and triggers data loading.
- **`getPythonData()`**: Calls the Python server to get data and processes it for the table.
- **`toggleRow(row)`**: Expands or collapses table rows.

#### `TabsComponent`
This component manages the tabs and interactions within the Navigator.

**Key Methods:**
- **`ngOnInit()`**: Loads initial data and default layers.
- **`ngAfterViewInit()`**: Handles Safari version incompatibility warnings.
- **`ngOnDestroy()`**: Cleans up ViewModels and subscriptions.
- **`adjustHeader(newHeight)`**: Adjusts the header height on scroll event.
- **`loadTabs(defaultLayers)`**: Opens initial tabs on application load.
- **`openTab(title, viewModel, isCloseable, replace, forceNew, isDataTable)`**: Opens a new tab.
- **`newBlankTab(replace)`**: Opens a new "blank" tab with new layer options.
- **`selectTab(tab)`**: Selects the specified tab.
- **`closeTab(tab, allowNoTab)`**: Closes the specified tab.
- **`closeActiveTab(allowNoTab)`**: Closes the currently selected tab.
- **`handleTabClick(tab)`**: Handles tab click event.
- **`filterDomains(version)`**: Filters domains on version.
- **`hasFeature(featureName)`**: Checks if a feature is defined in the config file.
- **`handleUserThemeChange(theme)`**: Handles theme change.
- **`openDialog(dialogName)`**: Opens the selected dialog.
- **`openSVGDialog(viewModel)`**: Opens the SVG exporter dialog.
- **`getUniqueLayerName(root)`**: Gets a layer name that does not conflict with existing layers.
- **`newLayerFromURL(loadData, obj)`**: Creates a new layer from URL.
- **`validateInput(loadData, domainVersionID)`**: Validates user input data before loading from URL.
- **`newLayer(domainVersionID, obj)`**: Creates a new layer in the given domain and version.
- **`indexToChar(index)`**: Gets the layer score expression variable for the tab at the given index.
- **`charToIndex(char)`**: Maps the character to the tab it corresponds to.
- **`layerByOperation()`**: Creates a new layer by operation based on user input.
- **`getScoreExpressionError()`**: Checks if there's an error in the score expression.
- **`openUploadPrompt()`**: Opens prompt to upload a layer.
- **`versionUpgradeDialog(viewModel)`**: Dialog to upgrade version if layer is not the latest version.
- **`upgradeLayer(oldViewModel, serialized, replace, defaultLayers)`**: Checks if the layer can be upgraded and initializes the upgrade process.
- **`loadLayerFromServer(filename)`**: Loads a layer from the server.
- **`processLayerObject(obj)`**: Processes layer object for loading.
- **`loadObjAsLayer(context, layerObj)`**: Loads object as layer.
- **`loadLayerFromFile()`**: Loads a layer from a file.
- **`readJSONFile(file)`**: Reads the JSON file and adds properties to a view model.
- **`versionMismatchWarning(layerVersionStr)`**: Checks if uploaded layer version is out of date and displays warnings.
- **`loadLayerFromURL(loadURL, replace, defaultLayers)`**: Loads a layer from URL.
- **`trackByFunction(index)`**: Tracks which layerLinkURLs have been added or removed.
- **`addLayerLink()`**: Adds a new empty layer link to the layerLinkURLs array.
- **`removeLayerLink(index)`**: Removes a layer link URL from the layerLinkURLs array.
- **`getLayerLink()`**: Converts layerLinkURL to a query string value for layerURL query string.
- **`selectLayerLink()`**: Selects the layer link field text.
- **`copyLayerLink()`**: Copies the created layer link to clipboard.
- **`isAlphabetical(text)`**: Returns true if the text is only letters a-z.
- **`getNamedFragmentValue(name, url)`**: Gets a key=value fragment value by key.
- **`getFilteredVMs()`**: Gets all view models in the same domain/version.

---

This documentation provides an overview of the key components and functions within the codebase, offering a detailed reference for understanding and extending the Navigator's capabilities.

---

You can copy and paste this directly into your README file.