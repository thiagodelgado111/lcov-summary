// LICENSE : MIT
"use strict";

export class FileSpecificResult {
    constructor(fileName, linesResult, branchesResult, functionsResult) {
        this._name = fileName;
	    this._lines = linesResult;
	    this._functions = functionsResult;
	    this._branches = branchesResult;
    }

    get fileName() {
        return this._name;
    }

    get functions () {
        return this._functions;
    }

    get lines () {
        return this._lines;
    }

    get branches () {
        return this._branches;
    }

    get functionsCoverage() {
        if(!this._functions) return 0;
        if(this._functions.found === 0) return 0;
        let coverage = this._functions.hit / this._functions.found * 100;
        return parseFloat(coverage.toFixed(2));
    }
    
    get linesCoverage() {
        if(!this._lines) return 0;
        if(this._lines.found === 0) return 0;
        let coverage = this._lines.hit / this._lines.found * 100;
        return parseFloat(coverage.toFixed(2));
    }
    
    get branchesCoverage() {
        if(!this._branches) return 0;
        if(this._branches.found === 0) return 0;
        let coverage = this._branches.hit / this._branches.found * 100;
        return parseFloat(coverage.toFixed(2));
    }
}

export class CoverageSpecificResult {
    /**
     * @param {FileSpecificResult[]} fileResults
     */
    constructor(fileResults = []) {
        this._fileResults = fileResults;
    }

    get files() {
        return this._fileResults;
    }

    get coverage() {

        let branchesCoverageTotal = 0;
        let branchesCoverageExecuted = 0;
        
        let linesCoverageExecuted = 0;
        let linesCoverageTotal = 0;
        
        let functionsCoverageTotal = 0;
        let functionsCoverageExecuted = 0;

        let totalCoverageFound = 0;
        let totalCoverageHit = 0;

        this.files.forEach(fileResult => {

            branchesCoverageTotal += fileResult.branches.found;
            branchesCoverageExecuted += fileResult.branches.hit;
            
            linesCoverageTotal += fileResult.lines.found;
            linesCoverageExecuted += fileResult.lines.hit;

            functionsCoverageTotal += fileResult.functions.found;
            functionsCoverageExecuted += fileResult.functions.hit;

            totalCoverageFound += (fileResult.branches.found + fileResult.lines.found + fileResult.functions.found);
            totalCoverageHit += (fileResult.branches.hit + fileResult.lines.hit + fileResult.functions.hit);
        });
        

        let totalCoverage = totalCoverageHit / totalCoverageFound * 100;
        let branchesCoverage = branchesCoverageTotal == 0 ? 0 : branchesCoverageExecuted / branchesCoverageTotal * 100;
        let functionsCoverage = functionsCoverageTotal == 0 ? 0: functionsCoverageExecuted / functionsCoverageTotal * 100;
    	let linesCoverage = linesCoverageTotal == 0 ? 0 : linesCoverageExecuted / linesCoverageTotal * 100;

        return {
            branchesCoverage: parseFloat(branchesCoverage.toFixed(2)),
    	    linesCoverage: parseFloat(linesCoverage.toFixed(2)),
            functionsCoverage: parseFloat(functionsCoverage.toFixed(2)),
            totalCoverage: parseFloat(totalCoverage.toFixed(2))
        };
    }
}
