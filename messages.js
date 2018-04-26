function sumSelections(votes) {
    const result = {};
    Object.keys(votes).map((key) => { return votes[key]; }).forEach((user) => {
        if (user.selection) {
            Object.keys(user.selection).forEach((product) => {
                let amount = result[product];
                if (amount) {
                    amount += user.selection[product];
                } else {
                    amount = user.selection[product];
                }
                result[product] = amount;
            });
        }
    });
    return result;
}

function createUserOverview(votes) {
    let result = "";
    const amountMap = {
        "0.25": "¼",
        "0.5": "½",
        "0.75": "¾",
        "1": "1"
    };
    const voteArray = Object.keys(votes).map((key) => { return votes[key]; }).filter((user) => {
        return user.selection && Object.keys(user.selection).length > 0;
    });

    voteArray.forEach((user, userIndex) => {
        const userSelection = Object.keys(user.selection);
        if (userSelection.length > 0) {
            let userProducts = user.name + " möchte ";
            userSelection.forEach((product, productIndex) => {
                if (productIndex > 0) {
                    if (productIndex === userSelection.length - 1) {
                        userProducts += " & ";
                    } else {
                        userProducts += ", ";
                    }
                }
                let amount = user.selection[product];
                let amountText = amountMap[String(amount)];
                if (amountText) {
                    userProducts += amountText + " " + product;
                } else {
                    userProducts += amount + " " + product;
                }
            });
            if (userIndex > 0) {
                result += "\n";
            }
            result += userProducts;
        }
    });
    return result;
}

function createSumOverview(sums) {
    const sumKeys = Object.keys(sums);
    if (sumKeys.length > 0) {
        let total = 0;
        let result = "Zu bestellen wären: ";
        sumKeys.forEach((product) => {
            result += '\n';
            let amount = sums[product];
            total += amount;
            result += amount + " " + product;
        });
        if (total > 0) {
            result += "\nInsgesamt also min. " + total + " Pizzen";
        }
        return result;
    } else {
        return null;
    }
}

function createGoOverview(votes) {
    const result = {};
    Object.keys(votes).map((key) => { return votes[key]; }).forEach((user) => {
        if (user.go) {
            if (!result[user.go]) {
                result[user.go] = [];
            }

            result[user.go].push(user.name);
        }
    });

    let message = '';
    Object.keys(result).forEach((key) => {
        message += '\n\n---\n';
        message += key + ': ';

        result[key].forEach((user, i) => {
            if (i > 0) {
                if (i === result[key].length - 1) {
                    message += " & ";
                } else {
                    message += ", ";
                }
            }
            message += user;
        });
    });

    return message;
}

module.exports = { sumSelections, createSumOverview, createUserOverview, createGoOverview };
