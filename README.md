# Grading Genius Library

## How to use

## 1. Install library:
    npm install grading-genius
## 2. Import library
    import { ManipulateJSFile, CodeAnalyzer } from "grading-genius"
## 3. Method used check spesification
    const analizer = new CodeAnalyzer()
    const spec = analizer.getSpecificationsFromCode(fileName)

    JSON :
    {
        functionNames: [],
        classNames: [],
        variableNames: []
    }
### 4. Method used check equals output
    const analizer = new CodeAnalyzer()
    const checkOutput = analizer.compareFileOutputs(fileName, fileName)

    JSON :
    {
        status: boolean,
        expectedOutput: string,
        actualOutput: string
    }
## 4. Method used manipulation variable
    manipulateJSFile.manipulateVariable(fileName, variableName, newValue)
    .then(result)
    .catch(error});

    JSON:
    {
        status: boolean,
        variableName: string,
        fileName: string,
        newValue: any,
        lastValue: any
    }

## 5. Method used check equals code
    const checkEquals = analizer.getCheckEqualCode(fileName,fileName)
    console.log(checkEquals)

    RETURN:
    boolean
## 6. Have fun code.

# Join collaboration GitHub
https://github.com/fsdio/grading-genius
