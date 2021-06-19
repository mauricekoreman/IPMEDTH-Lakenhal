const isJson = (currentUser) => {
    try {
        JSON.parse(currentUser);
    } catch (e) {
        return false;
    }
    return true;
}  

export default isJson ;