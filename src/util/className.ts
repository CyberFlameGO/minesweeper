const className = (classNames: { [key: string]: boolean }) => {
    let name = "";

    for (const key in classNames) {
        if (classNames[key] === true) {
            name += ` ${key}`;
        }
    }

    return name;
};

export default className;
