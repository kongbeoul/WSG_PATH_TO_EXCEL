const { existsSync, mkdirSync } = require("fs");
const { join } = require("path");
const xl = require("excel4node");
const utils = require("./utils");
const data = require("../data.json");

const SHEET_NAME = "퍼블리싱_완료_목록";

// COLUMN_NAME
const MENU = "menu";
const TITLE = "title";
const URL = "url";
const STATE = "state";

const wb = new xl.Workbook();
const ws = wb.addWorksheet(SHEET_NAME);

const headingStyle = wb.createStyle({
    alignment: {
        horizontal: ["center"],
        vertical: ["center"]
    },
    font: {
        color: "#111111",
        size: 14,
        bold: true
    }
});

const columnSyle = (colunm) => {
    const base = {
        alignment: {
            horizontal: ["center"],
            vertical: ["center"]
        },
        font: {
            size: 12,
            color: "#111111",
        }
    }

    return {
        [MENU]: base,
        [TITLE]: Object.assign({}, base, {
            alignment: {
                ...base.alignment,
                horizontal: ["left"]
            }
        }),
        [URL]: Object.assign({}, base, {
            font: {
                ...base.font,
                color: "#999999"
            }
        }),
        [STATE]: (state) => {
            const color = {
                "예정": "#5ee2e6",
                "진행중": "#ffbf50",
                "완료": "#4481fb",
                "삭제": "#aaaaaa"
            };

            return Object.assign({}, base, {
                font: {
                    size: 10,
                    color: state != "" ? color[state] : "#111111"
                }
            })
        }
    }[colunm]
}

const newData = utils.parsing([], data, "").map(v => {
    const filename = v.url.split("/");
    return {
        [MENU]: filename[filename.length - 1].replace(/.(html|jsp)/g, ""),
        ...v,
        [URL]: v.url ? `/${v.url}` : "",
    }
})
const headingColumnNames = Object.keys(newData[0]);

let headingColumnIndex = 1;
let rowIndex = 1;

headingColumnNames.filter(v => v !== "_depID").forEach(heading => {
    ws.cell(1, headingColumnIndex++).string(heading.toUpperCase()).style(headingStyle);
})
ws.column(1).setWidth(15);
ws.column(2).setWidth(100);
ws.column(3).setWidth(60);

newData.forEach(record => {
    if(record._depID == "1" && rowIndex !== 1) {
        rowIndex += 2
    } else {
        rowIndex++;
    }

    delete record._depID;

    let columnIndex = 1;

    Object.keys(record).forEach(columnName => {
        const style = columnSyle(columnName);

        switch(columnName) {
            case MENU: 
            case URL:
                ws.cell(rowIndex, columnIndex).string(record[columnName]).style(style)
                break;

            case TITLE:
                const value = record[columnName].slice(0, record[columnName].length - 2);
                ws.cell(rowIndex, columnIndex).string(value).style(style)
                break;
            
            case STATE:
                ws.cell(rowIndex, columnIndex).string(record[columnName]).style(style(record[columnName]))
                break;

            default:
                return;
        }
        columnIndex += 1;
    });
})

if(!existsSync(join(__dirname, "../dist"))) {
    mkdirSync(join(__dirname, "../dist"))
} 
wb.write(join(__dirname, `../dist/${SHEET_NAME}.xlsx`));