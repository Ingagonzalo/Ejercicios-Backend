/*import dotenv from "dotenv";
import pino from "pino";

dotenv.config();

const buildProdLogger = () => {
    const prodLogger = pino("debug.log");
    prodLogger.level = "debug";
    return prodLogger;
};

const buildDevLogger = () => {
    const devLogger = pino();
    devLogger.level = "info";
    return devLogger;
};



let logger;

if (process.env.NODE_ENV.toLocaleUpperCase() === "PROD") {
    logger = buildProdLogger();
} else {
    logger = buildDevLogger();
}

export default logger; buildWarnLogger;*/

import log4js from "log4js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


log4js.configure({
    appenders: {
        terminal: { type: 'console' },
        warnFile: { type: 'file', filename: __dirname + '../../log/warn.log' }, //Registrar sólo los logs de warning a un archivo llamada warn.log
        errorFile: { type: 'file', filename: __dirname + '../../log/error.log' }, //Enviar sólo los logs de error a un archivo llamada error.log
        loggerInfo: { type: 'logLevelFilter', appender: 'terminal', level: 'info' },
        loggerWarn: { type: 'logLevelFilter', appender: 'warnFile', level: 'warn', maxLevel: 'warn' },
        loggerError: { type: 'logLevelFilter', appender: 'errorFile', level: 'error', maxLevel: 'error' }
    },
    categories: {
        default: { appenders: ['terminal', 'loggerWarn', 'loggerError'], level: 'info' } //Loggear todos los niveles a consola (info, warning y error)
    }
})

const logger = log4js.getLogger();

export default logger;