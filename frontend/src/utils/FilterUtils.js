
const fetchFilterData = (filterData) => {
    let url = `?page=${filterData.page}`;
    if (filterData.id != null){
        url += `&id=${filterData.id}`
    }
    return url;
}
export default fetchFilterData;