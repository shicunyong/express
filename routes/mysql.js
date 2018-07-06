let searchData = (json) => {
    let str = 'select * from websites'
    if (json.id) {
        str += (' AND id = ' + json.id);
    }
    if (json.name) {
        str += (' ADD name = ' + json.name);
    }
    if (json.url) {
        str += (' AND url = ' + json.url);
    }
    return str;
};

let deleteData = (json) => {
    return 'delete from websites where id=' + json.id;
};

let insertData = (json) => {
    let str = 'INSERT INTO websites (name,url) VALUES ("' + json.name + '","' + json.url + '")';
    return str;
}

let updateData = (json) => {
    let str = 'update websites set name="' + json.name + '",url="' + json.url + '" where id=' + json.id;
    return str;
}

module.exports = {
    searchData,
    deleteData,
    insertData,
    updateData
};