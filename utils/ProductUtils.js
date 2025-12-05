const {readFile} = require('./filesUtils')
const applyPagination = (page, limit) => {
    let data = readFile();
    let totalProduct = data.length;
    let pageInt = parseInt(page), limitInt = parseInt(limit);
    let start = pageInt * limitInt - limitInt;
    start = (start > totalProduct) ? 0 : start;
    data  = data.slice(start, pageInt * limitInt);
    return data;
};
const applySorting = (price) => {
    const data = readFile();
    if (price.charAt(0) == '-') {
        data.sort((a,b) => a.price - b.price);
    } else {
        data.sort((a,b) => b.price - a.price);
    }
    return data;
};

const applyFiltering = (brand, inStock) => {
    const data = readFile();
    const filterData = data.filter((product) => {
        if (product.brand == brand && product.inStock == JSON.parse(inStock)) {
            return product;
        }
    });
    return filterData;
};

module.exports = {
    applyFiltering,
    applyPagination,
    applySorting
}