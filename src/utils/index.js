const changeStateName = state => ({
    'none': '',
    'soon': '예정',
    'ing': '진행중',
    'complete': '완료',
    'delete': '삭제'
}[state])

const parsing = (temp, data, acc) => {
    let i = 0;
    while (i < data.length) {
        const { _depID, title, url, state, children } = data[i];
        if (children.length > 0) {
            temp.push({ _depID, title: acc += title + ' > ', url, state: changeStateName(state) });
            parsing(temp, children, acc);
        } else {
            temp.push({ _depID, title: acc += title + ' > ', url, state: changeStateName(state) });
        }
        i++;
        acc = acc.slice(0, acc.indexOf(title + ' > '));
        if(_depID == "1") {
            acc = '';
        }
    }
    return temp;
};

module.exports = {
    parsing
}