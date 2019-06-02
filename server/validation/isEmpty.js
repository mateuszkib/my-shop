const isEmpty = (data) => data === undefined || (Object.keys(data).length === 0 && typeof data === 'object') || data === null || (typeof data === 'string' && data.trim().length === 0);

module.exports = isEmpty;