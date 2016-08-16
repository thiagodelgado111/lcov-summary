// LICENSE : MIT
"use strict";
import parse from "lcov-parse";
import { FileResult,CoverageResult } from "./FileResult";
import { FileSpecificResult,CoverageSpecificResult } from "./FileSpecificResult";
import { ReportWriter } from "./Writer";
import { SpecificReportWriter } from "./SpecificWriter";

function summary(content, mode, callback) {
    
    if (!content) {
        return callback(new Error("content is empty"));
    }

    parse(content, (error, results) => {

        try {

   	    	/** @type FileResult[] */
            const fileResults = results.map((result) => {
                if(mode === 'specific') return new FileSpecificResult(result.file, result.lines, result.branches, result.functions);
                return new FileResult(result.file, result.lines);
            });

            let coverageResult;
            if(mode === 'specific') {
               coverageResult = new CoverageSpecificResult(fileResults);
            } else {
                coverageResult = new CoverageResult(fileResults);
            }

            let writer;
            if(mode === 'specific') {
               writer = new SpecificReportWriter();
            } else {
               writer = new ReportWriter();
            }

            const output = writer.writeReport(coverageResult, mode);
            callback(null, output);

        } catch (error) {
            callback(error);
        }
    });
}
module.exports = summary;
