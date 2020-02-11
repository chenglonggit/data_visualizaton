

export  const toLowerLine=(str)=> {
    var temp = str.replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
    });
    if(temp.slice(0,1) === '-'){ //如果首字母是大写，执行replace时会多一个_，这里需要去掉
        temp = temp.slice(1);
    }
    return temp;
};
export  const toCamel=(str)=> {
    return str.replace(/([^-])(?:-+([^-]))/g, function ($0, $1, $2) {
        return $1 + $2.toUpperCase();
    });
};

