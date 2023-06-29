import moment from "moment";

const formatDate = (date) => moment(date).format("DD/MM/YYYY");

const getTime = (milli) => milli && new Date(milli).toISOString().slice(11, 19);

export { formatDate, getTime };
