// Copyright (C) 2020-1 Aaron Satterlee

import {Arguments} from "yargs";
import {getTransaction, getTransactions, TRANSACTION_TYPE} from "../transactions";

export default {
    command: "trans <command>",
    desc: "Retrieve transaction history",
    builder: (yargs: any): any => {
        return yargs
            .command("get <transactionId> <accountId>",
                "Get a specific transaction by <transactionId> for a specific <accountId>",
                {},
                async (argv: Arguments) => {
                    if (argv.verbose) {
                        console.log(`getting transaction ${argv.transactionId} for ${argv.accountId}`);
                    }
                    return getTransaction({
                        accountId: argv.accountId,
                        transactionId: argv.transactionId,
                        verbose: argv.verbose || false,
                    }).then(data => JSON.stringify(data, null, 2)).then(console.log).catch(console.log);
                })
            .command("getall <accountId>",
                "Get all transactions for a specific <accountId> and with the set options, such as type, from, to, symbol",
                {
                    type: {
                        type: "string",
                        choices: Object.keys(TRANSACTION_TYPE),
                    },
                    from: {
                        type: "string",
                        desc: "date, e.g. 2020-11-22",
                    },
                    to: {
                        type: "string",
                        desc: "date, e.g. 2020-11-29",
                    },
                    symbol: {
                        type: "string",
                        desc: "ticker symbol, e.g. TSLA",
                    },
                },
                async (argv: Arguments) => {
                    if (argv.verbose) {
                        console.log(`getting transactions for ${argv.accountId}`);
                    }
                    return getTransactions({
                        accountId: argv.accountId,
                        transactionId: argv.transactionId,
                        verbose: argv.verbose || false,
                    }).then(data => JSON.stringify(data, null, 2)).then(console.log).catch(console.log);
                });

    },
    handler: (argv: Arguments): any => { /* no op */ },
};
