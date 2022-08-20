
const TimeStampToDateString= (time)=>{
    let date = new Date(time * 1000);
    let month = (date.getMonth() + 1) < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
    let days = (date.getDate()) < 10 ? `0${date.getDate()}` : date.getDate();
    let hours = (date.getHours()) < 10 ? `0${date.getHours()}` : date.getHours();
    let minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${days}-${month}-${date.getFullYear()} ${hours}:${minutes}`;
}

export default TimeStampToDateString;