// LICENSE : MIT
"use strict";
import { vsprintf as format } from 'sprintf-js';
import ObjectAssign  from "object.assign";
const chalk = require('chalk');

class SpecificWriter {
    constructor(defaultText = "") {
        this._output = defaultText;
    }

    get output() {
        return this._output;
    }

    write(text) {
        this._output += text;
    }

    writeln(text) {
        this.write(text);
        this.writeEOL();
    }

    writeEOL() {
        this.write("\n");
    }
}

export class SpecificReportWriter {
    constructor(options) {
        this.writer = new SpecificWriter();
        this.options = ObjectAssign({}, {
            critical: 30.0,
            satisfactory: 70.0
        }, options);
    }

    /**
     * @param {CoverageResult} result
     */
    writeReport(result, mode) {
        this.writer.writeln("\nCode Coverage Results:\n");
        result.files.forEach(fileResult => {
            this.formatFileResult(fileResult);
        });

        let linesCoverage = this.colorize(result.coverage.linesCoverage);
        let branchesCoverage = this.colorize(result.coverage.branchesCoverage);
        let functionsCoverage = this.colorize(result.coverage.functionsCoverage);
        let totalCoverage = this.colorize(result.coverage.totalCoverage);

        this.writer.writeEOL();
        this.writer.writeln("Branches Coverage: " + branchesCoverage);
        this.writer.writeln("Functions Coverage: " + functionsCoverage);
        this.writer.writeln("Lines Coverage: " + linesCoverage);
        this.writer.writeln("Total Coverage: " + totalCoverage);
        this.writer.writeEOL();
        return this.writer.output;
    }

    formatFileResult(file) {
        let linesCoverage = this.colorize(file.linesCoverage);
        let branchesCoverage = this.colorize(file.branchesCoverage);
        let functionsCoverage = this.colorize(file.functionsCoverage);
    
        this.writeFileResult(file.fileName, linesCoverage, branchesCoverage, functionsCoverage);
    }

    colorize(coverage) {
        let percent = format('%6.2f%%', [coverage]);
        if (coverage >= this.options.satisfactory) {
            return chalk.green(percent);
        } else if (coverage < this.options.critical) {
            return chalk.red(percent);
        } else {
            return chalk.yellow(percent);
        }
    }

    writeFileResult(...values) {
        let output = format('%s %s %s %s ', values);
        this.writer.writeln(output);
    }
}
